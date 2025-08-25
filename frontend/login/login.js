document.addEventListener('DOMContentLoaded', () => {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const switchToSignInButton = document.getElementById('switchToSignIn');
  const switchToSignUpButton = document.getElementById('switchToSignUp');
  const aContainer = document.getElementById('a-container');
  const bContainer = document.getElementById('b-container');
  const switchC1 = document.getElementById('switch-c1');
  const switchC2 = document.getElementById('switch-c2');

  const showSignUp = () => {
      if (aContainer.classList.contains('is-hidden')) {
          aContainer.classList.remove('is-hidden');
          bContainer.classList.add('is-hidden');
          aContainer.classList.add('is-z200');
          bContainer.classList.remove('is-z200');
          switchC1.classList.remove('is-hidden');
          switchC2.classList.add('is-hidden');
      }
  };

  const showSignIn = () => {
      if (bContainer.classList.contains('is-hidden')) {
          aContainer.classList.add('is-hidden');
          bContainer.classList.remove('is-hidden');
          aContainer.classList.remove('is-z200');
          bContainer.classList.add('is-z200');
          switchC1.classList.add('is-hidden');
          switchC2.classList.remove('is-hidden');
      }
  };

  signUpButton.addEventListener('click', showSignUp);
  signInButton.addEventListener('click', showSignIn);
  switchToSignInButton.addEventListener('click', showSignIn);
  switchToSignUpButton.addEventListener('click', showSignUp);
});
