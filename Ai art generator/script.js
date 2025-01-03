import dotenv from 'dotenv';
dotenv.config();

const APIKey = process.env.API_KEY;
class ArtGenerator {
  constructor() {
    this.initializeElements();
    this.addEventListeners();
  }

  initializeElements() {
    this.styleOptions = document.querySelectorAll('.style-option');
    this.generateBtn = document.getElementById('generate');
    this.textarea = document.querySelector('textarea');
    this.artCanvas = document.getElementById('artCanvas');
    this.loading = document.querySelector('.loading');
  }

  addEventListeners() {
    this.styleOptions.forEach(option => {
      option.addEventListener('click', () => this.handleStyleSelection(option));
    });
    this.generateBtn.addEventListener('click', () => this.generateArt());
  }

  handleStyleSelection(selected) {
    this.styleOptions.forEach(opt => opt.classList.remove('selected'));
    selected.classList.add('selected');
  }

  async generateArt() {
    const prompt = this.textarea.value.trim();
    if (!prompt) {
      this.showError('Please enter a description');
      return;
    }

    this.loading.classList.add('active');
    this.artCanvas.innerHTML = '';

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: '1024x1024'
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      this.displayGeneratedArt(data.data[0].url);
    } catch (error) {
      this.showError('Error generating art. Please try again.');
      console.error('Error:', error);
    } finally {
      this.loading.classList.remove('active');
    }
  }

  displayGeneratedArt(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Generated artwork';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    this.artCanvas.appendChild(img);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    this.artCanvas.appendChild(errorDiv);
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new ArtGenerator();
});
