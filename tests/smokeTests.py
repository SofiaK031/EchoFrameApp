import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
# локальний шлях до файлів

SUBSCRIPTIONS_PAGE = f"file://C:\ProgramData\Jenkins\.jenkins\workspace\EchoFrameApp\tests/header-menu/subscriptions.html"
INDEX_PAGE = f"file://C:\ProgramData\Jenkins\.jenkins\workspace\EchoFrameApp\tests/index.html"


# 1. Позитивний тест: Оформлення підписки
def test_successful_subscription():
    driver = webdriver.Chrome()
    driver.get(SUBSCRIPTIONS_PAGE)

    # Очікування завантаження випадаючого списку "faculty"
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "faculty")))

    faculty_dropdown = Select(driver.find_element(By.ID, "faculty"))
    faculty_dropdown.select_by_visible_text("Факультет комп’ютерних наук")
    category_dropdown = Select(driver.find_element(By.ID, "category"))
    category_dropdown.select_by_visible_text("Працевлаштування")
    driver.find_element(By.ID, "submitSubscription").click()
    alert = driver.switch_to.alert
    assert "Підписку оформлено!" in alert.text
    alert.accept()
    driver.quit()


# 2. Негативний тест: Спроба оформлення підписки без вибору факультету
# def test_subscription_without_faculty():
#     driver = webdriver.Chrome()
#     driver.get(SUBSCRIPTIONS_PAGE)
#     category_dropdown = Select(driver.find_element(By.ID, "category"))
#     category_dropdown.select_by_visible_text("Спортивні заходи")
#     driver.find_element(By.ID, "submitSubscription").click()
#     faculty_error = driver.find_element(By.ID, "facultyError").text
#     assert "Оберіть факультет." in faculty_error
#     driver.quit()


# 3. Позитивний тест: Авторизація користувача
def test_login_modal_appears():
    driver = webdriver.Chrome()

    print(f"Opening URL: {INDEX_PAGE}")
    driver.get(INDEX_PAGE)
    
    driver.get(INDEX_PAGE)
    driver.find_element(By.CLASS_NAME, "login-btn").click()
    modal = driver.find_element(By.CLASS_NAME, "modal-window")
    assert modal.is_displayed()
    driver.quit()
