const taskTypeSelect = document.getElementById('task-type');
const businessTasks = document.getElementById('businessTasks');
const pleasureTasks = document.getElementById('pleasureTasks');

toggleTaskTypeIcons('business');

taskTypeSelect.addEventListener('change', () => {
    const selectedValue = taskTypeSelect.value;

    toggleTaskTypeIcons(selectedValue);
    updateBackgroundColor(selectedValue);
});

function toggleTaskTypeIcons(taskType) {

    if (taskType === 'business') {
        businessTasks.style.display = 'flex';
        pleasureTasks.style.display = 'none';
    } else if (taskType === 'pleasure') {
        pleasureTasks.style.display = 'flex';
        businessTasks.style.display = 'none';
    } else {
        businessTasks.style.display = 'none';
        pleasureTasks.style.display = 'none';
    }
}


function updateBackgroundColor(taskType) {
    document.body.classList.remove('business-mode', 'pleasure-mode');
    if (taskType === 'business') {
        document.body.classList.add('business-mode');
    } else if (taskType === 'pleasure') {
        document.body.classList.add('pleasure-mode');
    }
}

const taskNames = {
    business: ['BUSINESS', 'STUDY', 'EXERCISE', 'WRITING'],
    pleasure: ['GAMING', 'PRACTICE', 'OTHER']
};
const bannerText = document.getElementById('banner-text');
const taskIcons = document.querySelectorAll('.tasks i');

const taskAudioPaths = {
    BUSINESS: 'media/business.m4a', 
    STUDY: 'media/study.m4a',
    EXERCISE: 'media/exercise.m4a',
    WRITING: 'media/writing.m4a',
    GAMING: 'media/gaming.m4a',
    PRACTICE: 'media/practice.m4a',
    OTHER: 'media/other.m4a'
};

const taskAudioElements = {};

Object.keys(taskAudioPaths).forEach(taskName => {
    const audioElement = new Audio(taskAudioPaths[taskName]);
    audioElement.addEventListener('play', () => {
        console.log(`${taskName} audio started playing`);
    });
    audioElement.addEventListener('ended', () => {
        console.log(`${taskName} audio finished playing`);
    });
    audioElement.volume = 1;
    taskAudioElements[taskName] = audioElement;
});

taskIcons.forEach(icon => {
    icon.style.display = 'flex';
    icon.addEventListener('mouseover', () => {
        const taskName = icon.getAttribute('data-task');
        displayBannerText(taskName, true);
    });
    icon.addEventListener('mouseout', () => {
        displayBannerText('', false);
    });
    icon.addEventListener('click', () => {
        const taskName = icon.getAttribute('data-task');
        playAudioClip(icon.getAttribute('data-task'));
        enlargeIcon(icon);
        hideOtherIcons(icon.parentNode, taskName);
        bannerText.style.display = 'none';
    });
});

function displayBannerText(taskName, show) {
    bannerText.textContent = show ? taskName : '';
    bannerText.style.display = show ? 'block' : 'none';
}

function playAudioClip(taskName) {
    if (taskAudioElements.hasOwnProperty(taskName)) {
        const audioElement = taskAudioElements[taskName];
        audioElement.play();
    }
}

function enlargeIcon(icon) {
    icon.style.transform = 'scale(1.5)';
    icon.style.transition = 'font-size 0.5s';
}

function hideOtherIcons(iconContainer, excludedTask) {
    const icons = iconContainer.querySelectorAll('.tasks i');
    icons.forEach(icon => {
        if (icon.getAttribute('data-task') !== excludedTask) {
            icon.style.display = 'none';
        }
    });
}

const resetIcons = document.getElementById('reset-icons-button');
resetIcons.addEventListener('click', () => {
    restoreIconPositions();
});

function restoreIconPositions() {
    const taskType = taskTypeSelect.value;
    const iconsToDisplay = document.querySelectorAll(`.tasks.${taskType} i`);
    
    iconsToDisplay.forEach(icon => {
        icon.style.display = 'flex';
    });

    const bannerText = document.getElementById('banner-text');
    bannerText.textContent = '';
}

