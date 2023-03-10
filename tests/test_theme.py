import time

from utils import get_element, get_element_class

XPATH_THEME_BUTTON = "//label[@class='toggle']"
XPATH_BODY = "//body"


def has_theme_changed(driver, xpath_body, xpath_element):
	actual_theme = get_element_class(driver, xpath_body)
	theme_toggle_button = get_element(driver, xpath_element)
	theme_toggle_button.click()
	time.sleep(1)
	changed_theme = get_element_class(driver, xpath_body)
	return actual_theme != changed_theme


def test_theme_changed(driver):
	assert has_theme_changed(driver, XPATH_BODY, XPATH_THEME_BUTTON), "O tema não foi alterado!"
	print("O tema foi alterado!")
