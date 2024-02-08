function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("strength-text");
    const strengthBar = document.getElementById("strength-bar");
    const strengthLabel = document.getElementById("strength-label");

    // Calculate password strength based on complexity rules
    const { score, feedback } = calculatePasswordStrength(password);

    // Update the strength meter's text and style
    strengthText.textContent = `Strength: ${getStrengthLabel(score)}`;
    strengthLabel.textContent = getStrengthLabel(score);
    strengthBar.style.width = `${score * 20}%`;
    strengthBar.className = getStrengthClassName(score);

    // Provide detailed feedback to users
    displayFeedback(feedback);
}

function calculatePasswordStrength(password) {
    // Use regex patterns to check for uppercase letters, lowercase letters,
    // numbers, and special characters in the password
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Assign a score based on the complexity rules
    let score = 0;
    score += hasUppercase ? 1 : 0;
    score += hasLowercase ? 1 : 0;
    score += hasNumber ? 1 : 0;
    score += hasSpecialChar ? 1 : 0;

    // Provide feedback based on the score
    let feedback = [];
    if (password.length < 8) {
        feedback.push("Password should be at least 8 characters long.");
    }
    if (score < 3) {
        feedback.push("Include a mix of uppercase letters, lowercase letters, numbers, and special characters for a stronger password.");
    }

    return { score, feedback };
}

function getStrengthLabel(score) {
    switch (score) {
        case 0:
            return "Very Weak";
        case 1:
            return "Weak";
        case 2:
            return "Moderate";
        case 3:
            return "Strong";
        case 4:
            return "Very Strong";
        default:
            return "";
    }
}

function getStrengthClassName(score) {
    switch (score) {
        case 0:
        case 1:
            return "weak";
        case 2:
        case 3:
            return "moderate";
        case 4:
            return "strong";
        default:
            return "";
    }
}

function displayFeedback(feedback) {
    const feedbackContainer = document.getElementById("feedback-container");

    // Clear previous feedback
    feedbackContainer.innerHTML = "";

    // Display new feedback
    if (feedback.length > 0) {
        const feedbackList = document.createElement("ul");
        feedback.forEach(message => {
            const listItem = document.createElement("li");
            listItem.textContent = message;
            feedbackList.appendChild(listItem);
        });
        feedbackContainer.appendChild(feedbackList);
    }
}
