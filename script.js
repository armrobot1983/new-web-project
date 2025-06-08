// 全局变量
let audio = null;
let gojoAudio = null; // 五条悟祝福音频
let isPlaying = false;
let effectsInterval = null; // 用于存储持续效果的定时器
let confettiInterval = null; // 用于存储彩带效果的定时器
let subtitleElement = null; // 字幕元素
let clickHintElement = null; // 点击提示元素

// 页面加载时初始化音乐
window.addEventListener('load', function() {
    // 创建背景音乐
    if (!audio) {
        audio = new Audio('happy birthday..mp3');
        audio.loop = true; // 循环播放
        audio.volume = 0.6; // 设置音量
    }
    
    // 显示点击提示
    showClickHint();
    
    // 添加用户交互启动音乐
    document.addEventListener('click', startBackgroundMusic, { once: true });
});

// 启动背景音乐
function startBackgroundMusic() {
    if (audio && audio.paused) {
        audio.play().catch(error => {
            console.log('播放背景音乐失败:', error);
        });
    }
}

// 点击蛋糕放烟花
function playBirthdaySong() {
    // 添加点击反馈效果
    addClickFeedback();
    
    // 创建增强的烟花效果 - 点击时立即显示多个烟花
    createEnhancedFireworks();
}

// 创建增强的烟花效果 - 点击时的特效
function createEnhancedFireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#FF69B4', '#32CD32'];
    
    // 创建中心爆炸效果
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 中心大型烟花
    setTimeout(() => {
        createFireworkExplosion(centerX, centerY, '#FFFFFF', 2);
    }, 100);
    
    // 周围多个烟花，形成环形效果
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 150; // 距离中心的半径
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            createFireworkExplosion(x, y, color, 1.5);
        }, 200 + i * 100);
    }
    
    // 随机位置的额外烟花
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6; // 主要在上半部分
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            createSingleFirework(color, Math.random() * 0.5 + 1);
        }, 500 + i * 200);
    }
}

// 添加点击反馈效果
function addClickFeedback() {
    const cake = document.getElementById('cake');
    
    // 添加波纹效果
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        z-index: 100;
    `;
    
    // 添加波纹动画样式
    if (!document.querySelector('#rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes rippleEffect {
                to { transform: scale(20); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    cake.appendChild(ripple);
    
    // 移除波纹元素
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 创建特殊效果（音频播放结束时）
function createSpecialEffect() {
    // 创建一个大型烟花效果
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            createSingleFirework(color, 2); // 第二个参数表示大小倍数
        }, i * 300);
    }
    
    // 添加文字提示
    const message = document.createElement('div');
    message.className = 'birthday-text';
    message.textContent = '生日快乐！';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        color: #FFD700;
        text-shadow: 0 0 10px #FF6B35, 0 0 20px #FF6B35;
        opacity: 0;
        z-index: 1000;
        font-family: 'Ma Shan Zheng', cursive;
        animation: fadeInOut 2s ease-in-out forwards;
    `;
    
    // 添加动画样式
    if (!document.querySelector('#messageStyle')) {
        const style = document.createElement('style');
        style.id = 'messageStyle';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    // 添加五条悟主题元素
    addGojoElements();
    
    // 移除消息元素
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 2000);
}

// 添加五条悟主题元素
function addGojoElements() {
    // 创建六芒星图案
    const hexagram = document.createElement('div');
    hexagram.style.position = 'fixed';
    hexagram.style.top = '50%';
    hexagram.style.left = '50%';
    hexagram.style.transform = 'translate(-50%, -50%)';
    hexagram.style.width = '300px';
    hexagram.style.height = '300px';
    hexagram.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\' viewBox=\'0 0 300 300\'><polygon points=\'150,50 179,125 260,125 195,175 220,250 150,200 80,250 105,175 40,125 121,125\' stroke=\'%23445eff\' stroke-width=\'2\' fill=\'none\' opacity=\'0.3\'/></svg>")';
    hexagram.style.opacity = '0';
    hexagram.style.transition = 'opacity 1s ease, transform 2s ease';
    hexagram.style.zIndex = '-1';
    hexagram.style.pointerEvents = 'none';
    document.body.appendChild(hexagram);
    
    setTimeout(() => {
        hexagram.style.opacity = '0.3';
        hexagram.style.transform = 'translate(-50%, -50%) rotate(180deg)';
    }, 100);
    
    setTimeout(() => {
        hexagram.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(hexagram);
        }, 1000);
    }, 3000);
}

// 为生日文字添加动画
function animateBirthdayText() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    // 清除现有内容
    const originalText = title.textContent;
    title.textContent = '';
    
    // 逐个字符添加并设置动画
    for (let i = 0; i < originalText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = originalText[i];
        charSpan.style.cssText = `
            display: inline-block;
            animation: jumpIn 0.5s ease-out ${i * 0.1}s forwards;
            opacity: 0;
            transform: translateY(20px);
        `;
        title.appendChild(charSpan);
    }
    
    // 添加动画样式
    if (!document.querySelector('#jumpInStyle')) {
        const style = document.createElement('style');
        style.id = 'jumpInStyle';
        style.textContent = `
            @keyframes jumpIn {
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 开始持续的随机效果 - 优化版本
function startContinuousEffects() {
    // 清除之前的定时器（如果存在）
    if (effectsInterval) {
        clearInterval(effectsInterval);
    }
    
    let lastFireworkTime = Date.now();
    let lastMusicNoteTime = Date.now();
    
    // 使用requestAnimationFrame代替setInterval，更好的性能和帧率控制
    function animateEffects() {
        const currentTime = Date.now();
        
        // 控制烟花创建频率 - 每1.5秒最多一个
        if (currentTime - lastFireworkTime > 1500 && Math.random() < 0.4) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
            createSingleFirework(colors[Math.floor(Math.random() * colors.length)]);
            lastFireworkTime = currentTime;
        }
        
        // 控制音符创建频率 - 每1秒最多一个
        if (currentTime - lastMusicNoteTime > 1000 && Math.random() < 0.5) {
            showSingleMusicNote();
            lastMusicNoteTime = currentTime;
        }
        
        // 只有在播放状态下才继续动画循环
        if (isPlaying) {
            requestAnimationFrame(animateEffects);
        }
    }
    
    // 启动动画循环
    requestAnimationFrame(animateEffects);
}

// 创建烟花效果 - 优化版本
function createFireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const fragment = document.createDocumentFragment(); // 使用文档片段减少DOM重绘
    
    // 限制同时创建的烟花数量，减少性能压力
    const fireworkCount = Math.min(12, Math.floor(window.innerWidth / 200));
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createSingleFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 250); // 增加间隔，减少同时渲染的元素
    }
}

// 创建单个烟花 - 增强真实感版本
function createSingleFirework(color, sizeMultiplier = 1) {
    // 创建烟花发射轨迹
    const trail = document.createElement('div');
    trail.className = 'firework-trail';
    
    // 随机起点（底部）
    const startX = (Math.random() * 0.8 + 0.1) * window.innerWidth;
    const startY = window.innerHeight;
    
    // 随机终点（上部区域）
    const endX = startX + (Math.random() * 200 - 100);
    const endY = (Math.random() * 0.5 + 0.1) * window.innerHeight;
    
    // 设置轨迹样式
    trail.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        box-shadow: 0 0 6px ${color}, 0 0 12px rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        z-index: 10;
        pointer-events: none;
    `;
    
    document.body.appendChild(trail);
    
    // 轨迹动画
    const trailDuration = Math.random() * 500 + 500; // 500-1000ms
    
    // 使用Web Animation API实现更流畅的动画
    const trailAnimation = trail.animate([
        { left: `${startX}px`, top: `${startY}px`, opacity: 1 },
        { left: `${endX}px`, top: `${endY}px`, opacity: 0.8 }
    ], {
        duration: trailDuration,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });
    
    // 轨迹结束后爆炸
    trailAnimation.onfinish = () => {
        // 移除轨迹
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
        
        // 爆炸效果
        createFireworkExplosion(endX, endY, color, sizeMultiplier);
    };
}

// 创建烟花爆炸效果
function createFireworkExplosion(x, y, color, sizeMultiplier = 1) {
    // 爆炸中心光效
    const explosion = document.createElement('div');
    explosion.className = 'firework-explosion';
    explosion.style.cssText = `
        position: absolute;
        width: ${10 * sizeMultiplier}px;
        height: ${10 * sizeMultiplier}px;
        background: white;
        box-shadow: 0 0 30px ${color}, 0 0 60px white;
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        z-index: 20;
        pointer-events: none;
    `;
    
    document.body.appendChild(explosion);
    
    // 爆炸动画
    const explosionAnimation = explosion.animate([
        { transform: 'translate(-50%, -50%) scale(0.1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });
    
    explosionAnimation.onfinish = () => {
        if (explosion.parentNode) {
            explosion.parentNode.removeChild(explosion);
        }
    };
    
    // 创建粒子效果
    createEnhancedParticles(x, y, color, sizeMultiplier);
}

// 创建增强的粒子效果
function createEnhancedParticles(x, y, color, sizeMultiplier = 1) {
    const fragment = document.createDocumentFragment(); // 使用文档片段减少DOM重绘
    const particleCount = 24; // 增加粒子数量，更真实
    
    // 创建多种颜色变化
    const colors = [
        color,
        '#FFFFFF', // 白色
        shadeColor(color, 20), // 亮色
        shadeColor(color, -20) // 暗色
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机选择颜色
        const particleColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机粒子大小
        const size = (Math.random() * 2 + 1) * sizeMultiplier;
        
        // 随机形状变化
        const shapes = ['50%', '0%', '50% 0% 50% 50%', '50% 50% 0% 50%'];
        const borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        
        // 随机角度和速度
        const angle = Math.random() * Math.PI * 2; // 完全随机角度
        const velocity = (30 + Math.random() * 70) * sizeMultiplier; // 更大的速度范围
        const duration = 0.5 + Math.random() * 1.5; // 随机持续时间
        
        // 设置粒子样式
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${particleColor};
            box-shadow: 0 0 ${size * 2}px ${particleColor};
            border-radius: ${borderRadius};
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            opacity: 1;
            z-index: 15;
            pointer-events: none;
        `;
        
        fragment.appendChild(particle);
        
        // 使用Web Animation API实现更流畅的动画
        const particleAnimation = particle.animate([
            { 
                transform: 'translate(-50%, -50%)', 
                opacity: 1 
            },
            { 
                transform: `translate(
                    calc(-50% + ${Math.cos(angle) * velocity}px), 
                    calc(-50% + ${Math.sin(angle) * velocity}px)
                )`, 
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // 动画结束后移除粒子
        particleAnimation.onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
    
    document.body.appendChild(fragment);
}

// 辅助函数：调整颜色明暗
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;  
    G = (G < 255) ? G : 255;  
    B = (B < 255) ? B : 255;  

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

// 显示音乐符号
function showMusicNotes() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'music-note';
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = window.innerHeight - 100 + 'px';
            
            document.body.appendChild(note);
            
            setTimeout(() => {
                if (note.parentNode) {
                    note.parentNode.removeChild(note);
                }
            }, 2000);
        }, i * 300);
    }
}

// 显示单个音乐符号（用于持续效果）
function showSingleMusicNote() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    
    const note = document.createElement('div');
    note.className = 'music-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = window.innerHeight - 100 + 'px';
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        if (note.parentNode) {
            note.parentNode.removeChild(note);
        }
    }, 2000);
}

// 创建彩带效果
function startConfetti() {
    // 清除之前的定时器（如果存在）
    if (confettiInterval) {
        clearInterval(confettiInterval);
    }
    
    // 添加彩带样式
    if (!document.querySelector('#confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            .confetti {
                position: absolute;
                width: 10px;
                height: 20px;
                background-color: var(--color);
                opacity: 0.7;
                animation: confettiFall var(--fall-duration) ease-in forwards;
                z-index: 1;
            }
            
            @keyframes confettiFall {
                0% { transform: translateY(-100vh) rotate(0deg); }
                100% { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 设置定时器创建彩带
    confettiInterval = setInterval(() => {
        if (isPlaying) {
            createConfetti();
        } else {
            clearInterval(confettiInterval);
        }
    }, 300);
}

// 创建单个彩带
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#FF69B4', '#32CD32'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // 随机位置、颜色和下落时间
    const left = Math.random() * window.innerWidth + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const fallDuration = (Math.random() * 3 + 2) + 's';
    
    confetti.style.setProperty('--color', color);
    confetti.style.setProperty('--fall-duration', fallDuration);
    confetti.style.left = left;
    
    document.body.appendChild(confetti);
    
    // 使用animationend事件监听器自动移除元素
    confetti.addEventListener('animationend', () => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加点击事件监听器
    const cake = document.getElementById('cake');
    if (cake) {
        cake.addEventListener('click', playBirthdaySong);
    }
    
    // 自动播放背景烟花（较少）- 仅在未播放状态下
    setInterval(() => {
        if (!isPlaying && Math.random() < 0.3) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
            createSingleFirework(colors[Math.floor(Math.random() * colors.length)]);
        }
    }, 3000);
    
    // 添加页面加载动画
    addPageLoadAnimation();
});

// 页面加载动画
function addPageLoadAnimation() {
    // 为蛋糕添加入场动画
    const cake = document.getElementById('cake');
    if (cake) {
        cake.style.opacity = '0';
        cake.style.transform = 'translateY(50px)';
        cake.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            cake.style.opacity = '1';
            cake.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // 为标题添加入场动画
    const title = document.querySelector('h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-50px)';
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // 为提示文字添加入场动画
    const hint = document.querySelector('.click-hint');
    if (hint) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 1s ease 1s';
        
        setTimeout(() => {
            hint.style.opacity = '0.9';
        }, 800);
    }
}

// 键盘事件支持
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        playBirthdaySong();
    } else if (event.code === 'KeyF') {
        // 按F键触发额外的烟花效果
        event.preventDefault();
        createExtraFireworks();
    }
});

// 创建额外的烟花效果
function createExtraFireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            createSingleFirework(color, Math.random() * 0.5 + 0.8);
        }, i * 500);
    }
}

// 播放五条悟祝福音频
function playGojoBlessing() {
    // 降低背景音乐音量到更小
    if (audio) {
        audio.volume = 0.15; // 降低到15%
    }
    
    // 创建五条悟音频对象
    if (!gojoAudio) {
        gojoAudio = new Audio('五条悟祝福语.mp4');
        gojoAudio.volume = 0.9; // 设置音频音量为90%
        
        gojoAudio.addEventListener('ended', function() {
            // 音频结束后恢复背景音乐音量
            if (audio) {
                audio.volume = 0.6;
            }
            // 隐藏字幕
            hideSubtitles();
            // 重新显示点击提示
            setTimeout(() => {
                showClickHint();
            }, 1000);
        });
        
        gojoAudio.addEventListener('error', function(e) {
            console.error('五条悟音频播放失败:', e);
            // 恢复背景音乐音量
            if (audio) {
                audio.volume = 0.6;
            }
        });
    }
    
    // 播放五条悟音频
    gojoAudio.play().catch(error => {
        console.error('播放五条悟音频失败:', error);
        // 恢复背景音乐音量
        if (audio) {
            audio.volume = 0.6;
        }
    });
    
    // 显示字幕
    showSubtitles();
}

// 显示字幕
function showSubtitles() {
    // 创建字幕容器
    if (!subtitleElement) {
        subtitleElement = document.createElement('div');
        subtitleElement.className = 'subtitle-container';
        subtitleElement.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.5rem;
            font-family: 'ZiHunLongTengKaiShu', 'Ma Shan Zheng', cursive;
            text-align: center;
            z-index: 1000;
            max-width: 80%;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            border: 2px solid #445eff;
            opacity: 1;
            white-space: nowrap;
        `;
        
        // 添加字幕动画样式
        if (!document.querySelector('#subtitleStyle')) {
            const style = document.createElement('style');
            style.id = 'subtitleStyle';
            style.textContent = `
                @keyframes subtitleFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes subtitleFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(subtitleElement);
    }
    
    // 使用用户提供的字幕内容，根据音频时长调整时间轴
    const userSubtitle = "亲爱的李馨，今天是你的生日。首先，恭喜你又长大一岁，新的一岁祝您幸福、健康、富足。再次祝你生日快乐！";
    
    // 将长字幕分段显示，调整时间间隔（往前加1秒）
    const subtitles = [
        { time: 0, text: "亲爱的李馨，今天是你的生日。" },
        { time: 3000, text: "首先，恭喜你又长大一岁，" },
        { time: 7000, text: "新的一岁祝您幸福、健康、富足。" },
        { time: 11000, text: "再次祝你生日快乐！🎉" }
    ];
    
    // 显示字幕
    subtitles.forEach(subtitle => {
        setTimeout(() => {
            if (subtitleElement) {
                subtitleElement.textContent = subtitle.text;
                subtitleElement.style.opacity = '0';
                subtitleElement.style.animation = 'subtitleFadeIn 0.5s ease-in-out forwards';
            }
        }, subtitle.time);
    });
}

// 隐藏字幕
function hideSubtitles() {
    if (subtitleElement) {
        subtitleElement.style.animation = 'subtitleFadeOut 0.5s ease-in-out forwards';
        setTimeout(() => {
            if (subtitleElement && subtitleElement.parentNode) {
                subtitleElement.parentNode.removeChild(subtitleElement);
                subtitleElement = null;
            }
        }, 500);
    }
}

// 显示点击提示
function showClickHint() {
    if (!clickHintElement) {
        clickHintElement = document.createElement('div');
        clickHintElement.className = 'click-hint-gojo';
        clickHintElement.textContent = '点击让五条悟送你生日祝福';
        clickHintElement.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(145deg, #445eff, #6b73ff);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.3rem;
            font-family: 'ZiHunLongTengKaiShu', 'Ma Shan Zheng', cursive;
            text-align: center;
            z-index: 1000;
            max-width: 80%;
            box-shadow: 0 8px 25px rgba(68, 94, 255, 0.4);
            border: 2px solid #ffffff;
            cursor: pointer;
            animation: pulseGlow 2s ease-in-out infinite;
            white-space: nowrap;
        `;
        
        // 添加点击提示动画样式
        if (!document.querySelector('#clickHintStyle')) {
            const style = document.createElement('style');
            style.id = 'clickHintStyle';
            style.textContent = `
                @keyframes pulseGlow {
                    0%, 100% { 
                        transform: translateX(-50%) scale(1);
                        box-shadow: 0 8px 25px rgba(68, 94, 255, 0.4);
                    }
                    50% { 
                        transform: translateX(-50%) scale(1.05);
                        box-shadow: 0 12px 35px rgba(68, 94, 255, 0.6);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 添加点击事件
        clickHintElement.addEventListener('click', function() {
            hideClickHint();
            playGojoBlessing();
        });
        
        document.body.appendChild(clickHintElement);
    }
}

// 隐藏点击提示
function hideClickHint() {
    if (clickHintElement) {
        clickHintElement.style.opacity = '0';
        clickHintElement.style.transform = 'translateX(-50%) translateY(20px)';
        clickHintElement.style.transition = 'all 0.5s ease-out';
        setTimeout(() => {
            if (clickHintElement && clickHintElement.parentNode) {
                clickHintElement.parentNode.removeChild(clickHintElement);
                clickHintElement = null;
            }
        }, 500);
    }
}
