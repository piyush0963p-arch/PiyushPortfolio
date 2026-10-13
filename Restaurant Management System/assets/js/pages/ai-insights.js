// AI Insights Page JavaScript

const KNOWLEDGE_RESPONSES = {
    "bestsellers": "Based on today's orders, the **Truffle Mushroom Pizza** has a 42% order velocity increase. I recommend adding a temporary dinner special featuring wild truffles to leverage this trend.",
    "forecast": "Projected revenue for next week is **$32,450** (a 4.8% growth). This is driven by local festival events. I suggest ordering 20% extra Wagyu Ribeye inventory to prevent shortage.",
    "staff": "Saturday between 7 PM - 9 PM is your maximum peak hour. Roster scheduling shows you are currently understaffed by 1 Waiter during this window. I recommend assigning Cicero Tully to assist.",
    "inventory": "Alert: Fresh Mozzarella is at a critical 8kg. Based on our historical consumption data, this will sell out in 1.5 days. Place a Dairy Farms restock order immediately."
};

document.addEventListener('DOMContentLoaded', () => {
    setupChat();
    setupSuggestions();
});

const setupChat = () => {
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');

    if (!form || !input || !body) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text === '') return;

        // Append User Message
        appendMessage('user', text);
        input.value = '';

        // Bot Response Simulation
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let botReply = "I am processing your query against our business intelligence database. Could you specify if this relates to 'inventory', 'staff', 'sales forecast', or 'best sellers'?";

            if (lowerText.includes('best') || lowerText.includes('dish') || lowerText.includes('seller')) {
                botReply = KNOWLEDGE_RESPONSES["bestsellers"];
            } else if (lowerText.includes('forecast') || lowerText.includes('revenue') || lowerText.includes('next week')) {
                botReply = KNOWLEDGE_RESPONSES["forecast"];
            } else if (lowerText.includes('staff') || lowerText.includes('schedule') || lowerText.includes('hour')) {
                botReply = KNOWLEDGE_RESPONSES["staff"];
            } else if (lowerText.includes('inventory') || lowerText.includes('stock') || lowerText.includes('mozzarella')) {
                botReply = KNOWLEDGE_RESPONSES["inventory"];
            }

            appendMessage('bot', botReply);
        }, 800);
    });
};

const appendMessage = (sender, text) => {
    const body = document.getElementById('chatBody');
    if (!body) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // simple bold parser
    body.appendChild(bubble);

    // Scroll to bottom
    body.scrollTop = body.scrollHeight;
};

const setupSuggestions = () => {
    document.querySelectorAll('.suggestion-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const type = e.currentTarget.getAttribute('data-type');
            const questionText = e.currentTarget.querySelector('strong').textContent;
            
            // Put question in chat input
            const input = document.getElementById('chatInput');
            if (input) {
                input.value = `Tell me about the ${questionText.toLowerCase()} forecast.`;
                document.getElementById('chatForm').dispatchEvent(new Event('submit'));
            }
        });
    });
};
