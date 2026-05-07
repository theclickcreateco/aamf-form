/**
 * SlideController manages the onboarding flow for MortgageConnect
 */
class SlideController {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.selections = {};

        // DOM Elements
        this.slides = document.querySelectorAll('.slide');
        this.nextBtn = document.getElementById('btn-continue');
        this.backBtn = document.getElementById('btn-back');
        this.progressBars = document.querySelectorAll('.progress-bar');
        this.stepText = document.getElementById('step-text');
        this.heroContent = document.getElementById('hero-content');
        this.heroSection = document.querySelector('.hero');

        this.init();
    }

    init() {
        // Handle Option Selections (Buttons)
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.hideErrors();
                const step = option.closest('.slide').dataset.step;
                const value = option.dataset.value;
                this.selectOption(step, value, option);
            });
        });

        // Handle Select/Dropdowns
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.hideErrors();
                select.classList.remove('invalid');
                const step = select.closest('.slide').dataset.step;
                this.selections[step] = select.value;
                console.log(`Step ${step} selection (select): ${select.value}`);
            });
        });

        // Handle Text Inputs
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.hideErrors();
                input.classList.remove('invalid');
                const step = input.closest('.slide').dataset.step;
                if (!this.selections[step]) this.selections[step] = {};
                this.selections[step][input.name] = input.value;
            });
        });

        // Navigation
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.backBtn.addEventListener('click', () => this.prevStep());

        // Initial setup
        this.updateUI();
    }

    selectOption(step, value, element) {
        this.selections[step] = value;
        
        // Update UI
        const slide = element.closest('.slide');
        slide.querySelectorAll('.selection-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.classList.remove('invalid');
            opt.querySelector('.check-icon').style.display = 'none';
        });
        
        element.classList.add('selected');
        element.querySelector('.check-icon').style.display = 'block';

        console.log(`Step ${step} selection: ${value}`);
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            this.showErrors();
            return;
        }

        this.hideErrors();
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
        } else {
            this.submitForm();
        }
    }

    async submitForm() {
        const submitBtn = this.nextBtn;
        const originalText = submitBtn.innerText;
        
        try {
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'SUBMITTING...';
            submitBtn.style.opacity = '0.7';

            // Map step numbers to readable keys for the backend
            const stepMapping = {
                '1': 'loanType',
                '2': 'purpose',
                '3': 'loanAmount',
                '4': 'units',
                '5': 'state',
                '6': 'creditScore',
                '7': 'contactInfo'
            };

            const formattedData = {};
            for (const [step, value] of Object.entries(this.selections)) {
                const key = stepMapping[step] || `step${step}`;
                formattedData[key] = value;
            }

            console.log('Sending data:', formattedData);

            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                // Show success slide
                this.currentStep = 8;
                this.updateUI();
                // Hide footer actions on success
                document.querySelector('.footer-actions').style.display = 'none';
                document.querySelector('.progress-indicator').style.display = 'none';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            const errorMessage = error.message.includes('Unexpected token') 
                ? 'The server did not return a valid response. Are you running with "vercel dev"?' 
                : error.message;
            
            alert(`Submission Error: ${errorMessage}`);
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = '1';
        }
    }

    validateCurrentStep() {
        const step = this.currentStep.toString();
        
        // Special case for Contact Info (now Step 7)
        if (this.currentStep === 7) {
            const data = this.selections[step] || {};
            return !!(data.fullName && data.email && data.phone);
        }

        // Generic check for other slides
        return !!this.selections[step];
    }

    showErrors() {
        const currentSlide = document.querySelector(`.slide[data-step="${this.currentStep}"]`);
        const errorMsg = document.getElementById('error-message');
        
        errorMsg.style.display = 'block';

        if (this.currentStep === 7) {
            errorMsg.innerText = 'Please fill in all required fields';
            currentSlide.querySelectorAll('input[required]').forEach(input => {
                if (!input.value) input.classList.add('invalid');
            });
        } else {
            const select = currentSlide.querySelector('select');
            if (select) {
                errorMsg.innerText = 'Please select an option';
                select.classList.add('invalid');
            } else {
                errorMsg.innerText = 'Please make a selection';
                currentSlide.querySelectorAll('.selection-option').forEach(opt => {
                    opt.classList.add('invalid');
                });
            }
        }
    }

    hideErrors() {
        document.getElementById('error-message').style.display = 'none';
        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    updateUI() {
        // Update slides visibility
        this.slides.forEach(slide => {
            if (parseInt(slide.dataset.step) === this.currentStep) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });

        // Update progress indicators
        this.progressBars.forEach((bar, index) => {
            if (index < this.currentStep) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });

        // Update text
        if (this.stepText) {
            this.stepText.innerText = `Step ${this.currentStep} of ${this.totalSteps}`;
        }

        // Handle buttons state
        if (this.currentStep === 1) {
            this.backBtn.style.visibility = 'hidden';
        } else {
            this.backBtn.style.visibility = 'visible';
        }

        if (this.currentStep === this.totalSteps) {
            this.nextBtn.innerText = 'Submit';
        } else {
            this.nextBtn.innerText = 'Continue';
        }

        // Update hero content visibility
        if (this.heroContent) {
            this.heroContent.style.display = (this.currentStep === 1) ? 'block' : 'none';
        }

        if (this.heroSection) {
            this.heroSection.classList.toggle('compact', this.currentStep > 1);
        }

        // Scroll to top of form
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.onboarding = new SlideController();
});
