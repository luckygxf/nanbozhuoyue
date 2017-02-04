function thumbnail() { 
    const NAVPANEL_COLOR = 'rgba(100, 100, 100, 0.2)';    // 导航栏背景色
    const NAVBUTTON_BACKGROUND = 'rgb(40, 40, 40)';  // 导航栏中 button 的背景色
    const NAVBUTTON_COLOR = 'rgb(255, 255, 255)';   //button 的前景色
    const NAVBUTTON_HL_COLOR = 'rgb(100, 100, 100)';   //button 高亮时的前景色

    var canvas = document.getElementById('canvas');   // 获得 canvas 对象
    var context = canvas.getContext('2d');    // 获得上下文对象
 
    // 绘制左边 button 
    function paintLeftButton(navRect, color) { 
        //left button 
        lButtonRect = { 
            x: navRect.x + NAVBUTTON_XOFFSET, 
            y: navRect.y + NAVBUTTON_YOFFSET, 
            width: NAVBUTTON_WIDTH, 
            height: navRect.height - NAVBUTTON_YOFFSET * 2 
        } 

        context.save(); 
        context.fillStyle = color; 
        context.fillRect(lButtonRect.x, lButtonRect.y, 
 lButtonRect.width, lButtonRect.height); 

        //left arrow 
        context.save(); 
        context.fillStyle = NAVBUTTON_COLOR; 
        context.beginPath(); 
        context.moveTo(lButtonRect.x + NAVBUTTON_ARROW_XOFFSET, 
 lButtonRect.y + lButtonRect.height/2); 
        context.lineTo(lButtonRect.x + lButtonRect.width - NAVBUTTON_ARROW_XOFFSET, 
 lButtonRect.y + NAVBUTTON_ARROW_YOFFSET); 
        context.lineTo(lButtonRect.x + lButtonRect.width - NAVBUTTON_ARROW_XOFFSET, 
 lButtonRect.y + lButtonRect.height - NAVBUTTON_ARROW_YOFFSET); 
        context.lineTo(lButtonRect.x + NAVBUTTON_ARROW_XOFFSET, 
 lButtonRect.y + lButtonRect.height/2); 
        context.closePath(); 
        context.fill(); 
        context.restore(); 

        context.restore(); 
    }