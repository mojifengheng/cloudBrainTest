*** Settings ***
Documentation     监控静态页面跳转
Test Setup        添加图片地址
Library           Remote    http://192.168.100.229:8270/    #Test Teardown    停止远程服务器

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\web\\static\\icon

*** Test Cases ***
静态页面跳转
    打开浏览器
    输入网址并进入
    输入账号密码登陆
    确定成都外骨骼跳转

*** Keywords ***
添加图片地址
    Add Image Path    ${IMAGE_DIR}

停止远程服务器
    Stop Remote Server

打开浏览器
    doubleClick    desktop_chrome.png

输入网址并进入
    wait until screen contain    web_baidu.png    10
    Click    web_baidu.png
    Paste Text    web_baidu.png    120.79.23.235:5678
    Press Special Key    ENTER

输入账号密码登陆
    wait until screen contain    web_admin.png    10
    Paste Text    web_user.png    BfrRobot
    Click    web_user_check.png
    Paste Text    web_password.png    bfr123
    Press Special Key    ENTER
    Click    web_submit.png

确定成都外骨骼跳转
    wait until screen contain    web_static.png    10
    mouse move    web_chengdu.png
    Click    web_chengdu.png
