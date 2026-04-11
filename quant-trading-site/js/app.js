// QuantFlow - Trading Quantitatif Application JavaScript

// Global State
const state = {
    currentSection: 'home',
    btcPrice: 45000,
    totalPnL: 12458.73,
    winRate: 73.2,
    sharpeRatio: 2.87,
    trades: [],
    strategies: [
        { name: 'Momentum Alpha', pnl: 2341.50, status: 'active' },
        { name: 'Mean Reversion', pnl: 1823.20, status: 'active' },
        { name: 'Statistical Arb', pnl: 945.80, status: 'active' }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeCharts();
    initializeLiveUpdates();
    animateStats();
    initializeTerminal();
    initializeFormHandlers();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateTo(section);
        });
    });
    
    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('#mobileMenu .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').style.display = 'none';
        });
    });
}

function navigateTo(section) {
    // Update active section
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
    
    state.currentSection = section;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Chart Initialization
let heroChart, tradingChart;

function initializeCharts() {
    // Hero Chart
    const heroCtx = document.getElementById('heroChart').getContext('2d');
    const heroData = generateChartData(30, 100000, 0.02);
    
    heroChart = new Chart(heroCtx, {
        type: 'line',
        data: {
            labels: heroData.labels,
            datasets: [{
                label: 'Performance',
                data: heroData.values,
                borderColor: '#00D4AA',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { 
                    display: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9CA3AF' }
                }
            },
            animation: { duration: 2000 }
        }
    });
    
    // Trading Chart
    const tradingCtx = document.getElementById('tradingChart').getContext('2d');
    const tradingData = generateChartData(60, state.btcPrice, 0.01);
    
    tradingChart = new Chart(tradingCtx, {
        type: 'line',
        data: {
            labels: tradingData.labels,
            datasets: [{
                label: 'BTC/USD',
                data: tradingData.values,
                borderColor: '#00D4AA',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { 
                    display: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { 
                        color: '#9CA3AF',
                        callback: (value) => '$' + value.toLocaleString()
                    }
                }
            }
        }
    });
}

function generateChartData(points, baseValue, volatility) {
    const labels = [];
    const values = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < points; i++) {
        labels.push(i);
        values.push(currentValue);
        const change = (Math.random() - 0.5) * 2 * volatility * currentValue;
        currentValue += change;
    }
    
    return { labels, values };
}

// Live Updates System
function initializeLiveUpdates() {
    // Update BTC Price every 2 seconds
    setInterval(updateBTCPrice, 2000);
    
    // Update Order Book every second
    setInterval(updateOrderBook, 1000);
    
    // Update Active Strategies every 3 seconds
    setInterval(updateActiveStrategies, 3000);
    
    // Add Random Trade every 2-5 seconds
    setInterval(addRandomTrade, Math.random() * 3000 + 2000);
    
    // Update Terminal every 2 seconds
    setInterval(addTerminalMessage, 2000);
    
    // Initial population
    updateOrderBook();
    updateActiveStrategies();
}

function updateBTCPrice() {
    const change = (Math.random() - 0.5) * 200;
    state.btcPrice += change;
    
    const priceElement = document.getElementById('btcPrice');
    const changeElement = document.getElementById('btcChange');
    
    priceElement.textContent = '$' + state.btcPrice.toFixed(2);
    
    const percentChange = ((state.btcPrice - 45000) / 45000) * 100;
    changeElement.textContent = (percentChange >= 0 ? '+' : '') + percentChange.toFixed(2) + '%';
    changeElement.className = percentChange >= 0 ? 'text-sm text-emerald-400' : 'text-sm text-red-400';
    
    // Update chart
    if (tradingChart) {
        const newData = tradingChart.data.datasets[0].data;
        newData.shift();
        newData.push(state.btcPrice);
        tradingChart.update('none');
    }
}

function updateOrderBook() {
    const askOrders = document.getElementById('askOrders');
    const bidOrders = document.getElementById('bidOrders');
    
    let asksHTML = '';
    let bidsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const askPrice = state.btcPrice + (i + 1) * 5 + Math.random() * 10;
        const askSize = (Math.random() * 2).toFixed(4);
        asksHTML = `<div class="flex justify-between"><span class="text-red-400">${askPrice.toFixed(2)}</span><span class="text-gray-400">${askSize}</span></div>` + asksHTML;
        
        const bidPrice = state.btcPrice - (i + 1) * 5 - Math.random() * 10;
        const bidSize = (Math.random() * 2).toFixed(4);
        bidsHTML += `<div class="flex justify-between"><span class="text-emerald-400">${bidPrice.toFixed(2)}</span><span class="text-gray-400">${bidSize}</span></div>`;
    }
    
    askOrders.innerHTML = asksHTML;
    bidOrders.innerHTML = bidsHTML;
}

function updateActiveStrategies() {
    const container = document.getElementById('activeStrategies');
    
    let html = '';
    state.strategies.forEach((strategy, index) => {
        const pnlChange = (Math.random() - 0.5) * 100;
        strategy.pnl += pnlChange;
        
        html += `
            <div class="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                    <div class="font-semibold text-sm">${strategy.name}</div>
                    <div class="text-xs text-gray-400">${strategy.status === 'active' ? 'En cours' : 'Arrêté'}</div>
                </div>
                <div class="text-right">
                    <div class="font-bold mono ${strategy.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                        ${strategy.pnl >= 0 ? '+' : ''}$${strategy.pnl.toFixed(2)}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function addRandomTrade() {
    const types = ['BUY', 'SELL'];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = (Math.random() * 10).toFixed(4);
    const price = state.btcPrice + (Math.random() - 0.5) * 100;
    const pnl = (Math.random() - 0.4) * 500;
    
    const trade = {
        id: Date.now(),
        type,
        size,
        price,
        pnl,
        timestamp: new Date()
    };
    
    state.trades.unshift(trade);
    if (state.trades.length > 10) state.trades.pop();
    
    // Update P&L
    state.totalPnL += pnl;
    updatePerformanceMetrics();
    
    // Display trade
    displayTrade(trade);
}

function displayTrade(trade) {
    const container = document.getElementById('recentTrades');
    const tradeElement = document.createElement('div');
    tradeElement.className = 'flex items-center justify-between p-2 bg-gray-800 rounded text-sm';
    tradeElement.innerHTML = `
        <div class="flex items-center space-x-3">
            <span class="font-bold ${trade.type === 'BUY' ? 'text-emerald-400' : 'text-red-400'}">${trade.type}</span>
            <span class="text-gray-400">${trade.size} BTC</span>
        </div>
        <div class="text-right">
            <div class="mono">${trade.price.toFixed(2)}</div>
            <div class="text-xs ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}
            </div>
        </div>
    `;
    
    container.insertBefore(tradeElement, container.firstChild);
    
    if (container.children.length > 5) {
        container.removeChild(container.lastChild);
    }
}

function updatePerformanceMetrics() {
    document.getElementById('totalPnL').textContent = '+$' + state.totalPnL.toFixed(2);
    document.getElementById('winRate').textContent = state.winRate.toFixed(1) + '%';
    document.getElementById('sharpeRatio').textContent = state.sharpeRatio.toFixed(2);
}

// Stats Animation
function animateStats() {
    const targets = [
        { id: 'stat1', value: 2.5, suffix: 'B' },
        { id: 'stat2', value: 47, suffix: '' },
        { id: 'stat3', value: 1250, suffix: '+' }
    ];
    
    targets.forEach(target => {
        animateCounter(target.id, target.value, target.suffix);
    });
}

function animateCounter(elementId, target, suffix) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target < 10) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
}

// Terminal Simulation
function initializeTerminal() {
    const messages = [
        { text: '[SYSTEM] Initialisation des algorithmes de trading...', color: '#676e95' },
        { text: '[CONNECT] Connexion au marché BTC/USD établie', color: '#27c93f' },
        { text: '[INFO] Chargement des données historiques...', color: '#9CA3AF' },
        { text: '[ALERT] Opportunité de trading détectée - Momentum Alpha', color: '#f78c6c' },
        { text: '[EXEC] Ordre exécuté: BUY 0.5 BTC @ $45,234.50', color: '#82aaff' },
        { text: '[RISK] Stop-loss ajusté à $44,800.00', color: '#ffbd2e' },
        { text: '[INFO] P&L en temps réel: +$1,234.56', color: '#c3e88d' }
    ];
    
    state.terminalMessages = messages;
    state.currentMessageIndex = 0;
}

function addTerminalMessage() {
    const output = document.getElementById('terminalOutput');
    const messages = state.terminalMessages;
    
    if (state.currentMessageIndex >= messages.length) {
        state.currentMessageIndex = 0;
    }
    
    const message = messages[state.currentMessageIndex];
    const line = document.createElement('div');
    line.style.color = message.color;
    line.textContent = message.text;
    
    output.appendChild(line);
    
    if (output.children.length > 8) {
        output.removeChild(output.firstChild);
    }
    
    state.currentMessageIndex++;
}

// Form Handlers
function initializeFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Envoyé!';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Utility Functions
window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-opacity-95');
    } else {
        nav.classList.remove('bg-opacity-95');
    }
});

console.log('%c QuantFlow - Trading Quantitatif ', 'background: #00D4AA; color: #0B0F19; font-size: 20px; padding: 10px;');
console.log('%c Plateforme de trading algorithmique nouvelle génération ', 'color: #9CA3AF; font-size: 12px;');
