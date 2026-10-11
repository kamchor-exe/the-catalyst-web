const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !expanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
    menuButton.focus();
  }
});

const form = document.querySelector('#inquiry-form');
const status = document.querySelector('#form-status');
const businessEmail = 'YOUR_EMAIL@example.com';

form.addEventListener('input', (event) => {
  event.target.removeAttribute('aria-invalid');
  if (status.textContent) status.textContent = '';
  status.classList.remove('success');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  status.classList.remove('success');

  const requiredFields = [...form.querySelectorAll('[required]')];
  const invalidFields = requiredFields.filter((field) => !field.checkValidity());
  form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));

  if (invalidFields.length) {
    invalidFields.forEach((field) => field.setAttribute('aria-invalid', 'true'));
    status.textContent = 'Please complete the required fields with a valid email address.';
    invalidFields[0].focus();
    return;
  }

  const values = new FormData(form);
  const subject = `Project inquiry from ${values.get('name')}`;
  const body = [
    `Name: ${values.get('name')}`,
    `Company: ${values.get('company') || 'Not provided'}`,
    `Email: ${values.get('email')}`,
    `Service: ${values.get('service')}`,
    '',
    'Project details:',
    values.get('message'),
  ].join('\n');

  if (businessEmail === 'YOUR_EMAIL@example.com') {
    status.textContent = 'Your inquiry is ready. The site owner needs to replace the email placeholder before messages can be sent.';
    return;
  }

  window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email app is opening with the inquiry details.';
  status.classList.add('success');
});

document.querySelector('#year').textContent = new Date().getFullYear();
