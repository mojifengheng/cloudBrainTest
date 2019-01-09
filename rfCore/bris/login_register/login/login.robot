*** Settings ***
Documentation     Sikuli Library Demo
Test Setup        Add Needed Image Path
Test Teardown     Stop Remote Server
Library           Remote    http://192.168.100.237:8270/

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\bris\\login_register\\login\\

*** Test Cases ***
Register Bris
    Open Bris Page
    Clear Old Account
    Type Account
    Click Login


*** Keywords ***
Add Needed Image Path
    Add Image Path    ${IMAGE_DIR}

Open Bris Page
    doubleClick    desktop_cloud_brain.png
    wait until screen contain    login_page.png    10
Clear Old Account
    doubleClick  login_page_account.png
    Press Special Key  BACKSPACE
    doubleClick   login_page_password.png
    Press Special Key  BACKSPACE
Type Account
    Input Text    login_page_account.png    123456
    Input Text     login_page_password.png   123456
Click Login
    Click         login_page_login_button
