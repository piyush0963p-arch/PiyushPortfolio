/**
 * ai-assistant.js
 * Logic for the AI Assistant Chat Interface
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatContainer = document.getElementById('chatContainer');
  const suggestedPrompts = document.querySelectorAll('.suggested-prompts .chip');

  // Auto-resize textarea
  if (chatInput) {
    chatInput.addEventListener('input', function() {
      this.style.height = '60px'; // Reset to min-height
      const scrollHeight = this.scrollHeight;
      // Cap max height
      if (scrollHeight < 150) {
        this.style.height = scrollHeight + 'px';
      } else {
        this.style.height = '150px';
      }
    });

    // Enter to send (Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Send message on button click
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Handle suggested prompts clicks
  if (suggestedPrompts) {
    suggestedPrompts.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        if (chatInput) {
          chatInput.value = text;
          chatInput.focus();
        }
      });
    });
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add User Message to UI
    appendUserMessage(text);
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = '60px';
    chatInput.focus();

    // 2. Show AI Typing Indicator
    showTypingIndicator();

    // 3. Simulate AI Response Delay
    setTimeout(() => {
      removeTypingIndicator();
      appendAIMessage("This is a simulated response. In a production environment, this would be connected to the NexusAI backend API to process: '" + text + "'. Let me know if you need help exploring the UI components!");
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
  }

  function appendUserMessage(text) {
    const msgHTML = `
      <div class="chat-message user animate-fade-in-up">
        <div class="chat-bubble bg-primary text-white">
          <p>${escapeHTML(text)}</p>
        </div>
        <div class="chat-avatar bg-secondary text-primary">JD</div>
      </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
  }

  function appendAIMessage(text) {
    const msgHTML = `
      <div class="chat-message ai animate-fade-in-up">
        <div class="chat-avatar bg-gradient-primary"><i data-lucide="sparkles"></i></div>
        <div class="chat-bubble">
          <p>${escapeHTML(text)}</p>
        </div>
      </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', msgHTML);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  function showTypingIndicator() {
    const msgHTML = `
      <div class="chat-message ai animate-fade-in-up" id="typingIndicator">
        <div class="chat-avatar bg-gradient-primary"><i data-lucide="sparkles"></i></div>
        <div class="chat-bubble">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', msgHTML);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
  }

});
