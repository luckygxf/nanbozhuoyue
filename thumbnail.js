function thumbnail() { 
    const NAVPANEL_COLOR = 'rgba(100, 100, 100, 0.2)';    // ����������ɫ
    const NAVBUTTON_BACKGROUND = 'rgb(40, 40, 40)';  // �������� button �ı���ɫ
    const NAVBUTTON_COLOR = 'rgb(255, 255, 255)';   //button ��ǰ��ɫ
    const NAVBUTTON_HL_COLOR = 'rgb(100, 100, 100)';   //button ����ʱ��ǰ��ɫ

    var canvas = document.getElementById('canvas');   // ��� canvas ����
    var context = canvas.getContext('2d');    // ��������Ķ���
 
    // ������� button 
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