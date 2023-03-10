from selenium import webdriver

from test_clock import test_clock_is_correct
from test_image import test_image_changed
from test_text import test_text_changed
from test_theme import test_theme_changed

driver = webdriver.Chrome()
driver.get("https://frases-para-rivania.netlify.app/")

try:
	test_clock_is_correct(driver)
	test_image_changed(driver)
	test_text_changed(driver)
	test_theme_changed(driver)
finally:
	driver.quit()
