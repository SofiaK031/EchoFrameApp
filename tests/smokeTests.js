const { Builder, By, until, Select } = require('selenium-webdriver');

const SUBSCRIPTIONS_PAGE = "https://github.com/SofiaK031/EchoFrameApp/edit/main/header-menu/subscriptions.html";
const INDEX_PAGE = "https://github.com/SofiaK031/EchoFrameApp/blob/main/index.html";

async function testSuccessfulSubscription() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(SUBSCRIPTIONS_PAGE);
        
        let facultyDropdown = await driver.findElement(By.id("faculty"));
        let facultySelect = new Select(facultyDropdown);
        await facultySelect.selectByVisibleText("Факультет комп'ютерних наук");
        
        let categoryDropdown = await driver.findElement(By.id("category"));
        let categorySelect = new Select(categoryDropdown);
        await categorySelect.selectByVisibleText("Працевлаштування");
        
        await driver.findElement(By.id("submitSubscription")).click();
        
        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        console.assert(alertText.includes("Підписку оформлено!"), "Тест провалено: неправильний текст повідомлення");
        await alert.accept();
    } finally {
        await driver.quit();
    }
}

async function testSubscriptionWithoutFaculty() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(SUBSCRIPTIONS_PAGE);
        
        let categoryDropdown = await driver.findElement(By.id("category"));
        let categorySelect = new Select(categoryDropdown);
        await categorySelect.selectByVisibleText("Спортивні заходи");
        
        await driver.findElement(By.id("submitSubscription")).click();
        
        let facultyError = await driver.findElement(By.id("facultyError")).getText();
        console.assert(facultyError.includes("Оберіть факультет."), "Тест провалено: повідомлення про помилку відсутнє");
    } finally {
        await driver.quit();
    }
}

async function testLoginModalAppears() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(INDEX_PAGE);
        await driver.findElement(By.className("login-btn")).click();
        
        let modal = await driver.wait(until.elementLocated(By.className("modal-window")), 5000);
        let isDisplayed = await modal.isDisplayed();
        console.assert(isDisplayed, "Тест провалено: модальне вікно не з'явилося");
    } finally {
        await driver.quit();
    }
}

(async function runTests() {
    await testSuccessfulSubscription();
    await testSubscriptionWithoutFaculty();
    await testLoginModalAppears();
})();
