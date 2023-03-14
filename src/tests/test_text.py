from utils import get_element_text

XPATH_CARD_PHRASE = "//p[@id='card__phrase']"


def has_text_changed(driver, xpath_element):
	actual_text = get_element_text(driver, xpath_element)
	driver.refresh()
	changed_text = get_element_text(driver, xpath_element)
	return actual_text != changed_text


def test_text_changed(driver):
	assert has_text_changed(driver, XPATH_CARD_PHRASE), "O texto não foi alterado!"
	print("O texto foi alterado!")
