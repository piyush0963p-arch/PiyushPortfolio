/**
 * ai-generator.js
 * Logic for the AI Campaign Generator Wizard
 */

document.addEventListener('DOMContentLoaded', () => {
  // Wizard Navigation
  const steps = document.querySelectorAll('.wizard-stepper .step');
  const stepContents = document.querySelectorAll('.wizard-step-content');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  
  const goToStep = (stepNumber) => {
    // Update Stepper UI
    steps.forEach(step => {
      const stepIdx = parseInt(step.dataset.step);
      if (stepIdx < stepNumber) {
        step.classList.add('completed');
        step.classList.remove('active');
        // highlight divider
        const divider = step.nextElementSibling;
        if (divider && divider.classList.contains('step-divider')) {
          divider.classList.add('filled');
        }
      } else if (stepIdx === parseInt(stepNumber)) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
        const prevDivider = step.previousElementSibling;
        if (prevDivider && prevDivider.classList.contains('step-divider')) {
          prevDivider.classList.remove('filled');
        }
      }
    });

    // Update Content
    stepContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `step${stepNumber}`) {
        content.classList.add('active');
      }
    });
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.dataset.next;
      
      // Simple validation for step 1
      if (btn.closest('#step1')) {
        const prodName = document.getElementById('productName').value;
        if (!prodName) {
          if (window.showToast) window.showToast('Please enter a Product/Service Name', 'error');
          return;
        }
      }

      // If generating (Step 4)
      if (targetStep === "4") {
        goToStep(4);
        simulateAIGeneration();
      } else {
        goToStep(targetStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(btn.dataset.prev);
    });
  });

  // Selectable Cards Logic
  const selectableCards = document.querySelectorAll('.selectable-card');
  selectableCards.forEach(card => {
    card.addEventListener('click', () => {
      // If it's a checkbox style, toggle
      if (card.classList.contains('checkbox-style')) {
        card.classList.toggle('selected');
      } 
      // Else it's radio style within a group
      else {
        const siblings = card.parentElement.querySelectorAll('.selectable-card');
        siblings.forEach(s => s.classList.remove('selected'));
        card.classList.add('selected');
      }
    });
  });

  // AI Generation Simulation
  const loadingState = document.getElementById('loadingState');
  const resultsState = document.getElementById('resultsState');
  const loadingText = document.getElementById('loadingText');
  const progressFill = document.querySelector('.loading-progress-fill');

  const simulateAIGeneration = () => {
    loadingState.classList.remove('hidden');
    resultsState.classList.add('hidden');
    progressFill.style.width = '0%';
    
    const steps = [
      { text: "Analyzing objective and target audience...", progress: 25, delay: 1000 },
      { text: "Researching competitor keywords...", progress: 50, delay: 2500 },
      { text: "Drafting high-converting ad copy...", progress: 75, delay: 4000 },
      { text: "Finalizing campaign parameters...", progress: 100, delay: 5500 }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        loadingText.textContent = step.text;
        progressFill.style.width = `${step.progress}%`;
      }, step.delay);
    });

    // Finish
    setTimeout(() => {
      loadingState.classList.add('hidden');
      resultsState.classList.remove('hidden');
      if (window.showToast) window.showToast('Campaign generated successfully!', 'success');
    }, 6500);
  };

  // Results Tabs
  const resultsTabs = document.querySelectorAll('#resultsTabs .tab-item');
  const tabContents = document.querySelectorAll('.tab-content');

  resultsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      resultsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.target;
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

});
