'use strict';

// Frontend preview only. Wallet funding and VTU purchases will be connected
// to a secure backend in later steps. Never place provider secrets here.
const dialog = document.getElementById('actionDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogMessage = document.getElementById('dialogMessage');
const dialogIcon = document.getElementById('dialogIcon');
const balanceValue = document.getElementById('balanceValue');
const toggleBalance = document.getElementById('toggleBalance');
let balanceVisible = true;

function showDialog(title, message, icon = '✦') {
  dialogTitle.textContent = title;
  dialogMessage.textContent = message;
  dialogIcon.textContent = icon;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else window.alert(`${title}\n\n${message}`);
}

document.querySelectorAll('[data-service]').forEach((tile) => {
  tile.addEventListener('click', () => {
    const service = tile.dataset.service;
    showDialog(`${service} is coming soon`, `The ${service.toLowerCase()} purchase screen will be added after we connect the backend and a verified Nigerian VTU provider. No payment has been taken.`, service === 'Airtime' ? '▯' : service === 'Data' ? '◎' : service === 'Cable TV' ? '▣' : 'ϟ');
  });
});

document.getElementById('fundWalletBtn').addEventListener('click', () => {
  showDialog('Wallet funding is not active yet', 'We will connect Paystack through the backend before accepting real payments. This preview will not charge you.', '₦');
});

toggleBalance.addEventListener('click', () => {
  balanceVisible = !balanceVisible;
  balanceValue.textContent = balanceVisible ? '₦0.00' : '••••••';
  toggleBalance.setAttribute('aria-label', balanceVisible ? 'Hide wallet balance' : 'Show wallet balance');
});

document.getElementById('notificationsBtn').addEventListener('click', () => {
  showDialog('You’re all caught up', 'Important service updates and transaction notifications will appear here.', '♧');
});
document.getElementById('menuBtn').addEventListener('click', () => {
  showDialog('Sankara SmartData menu', 'Account settings, help, and support will be available here after we build the account features.', '☰');
});
document.getElementById('viewAllBtn').addEventListener('click', () => {
  showDialog('Transaction history', 'Your transaction history will appear here after you complete your first successful purchase.', '◷');
});

document.querySelectorAll('[data-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const tab = button.dataset.tab;
    if (tab === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (tab === 'Services') {
      document.getElementById('servicesTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'History') {
      document.getElementById('activityTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
      showDialog('Transaction history', 'This preview has no real transactions yet. We will connect transaction records later.', '◷');
    } else if (tab === 'Wallet') {
      document.getElementById('walletTitle').scrollIntoView({ behavior: 'smooth', block: 'center' });
      showDialog('Your wallet', 'Wallet funding and balance updates will be connected securely in a later step.', '▱');
    } else {
      showDialog('Your profile', 'Registration, login, and profile settings will be built in the next stages.', '♙');
    }
  });
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
