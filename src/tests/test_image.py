from utils import get_image_src

XPATH_CARD_IMAGE = "//img[@id='card__image']"


def has_image_changed(driver, xpath_element):
	actual_image = get_image_src(driver, xpath_element)
	driver.refresh()
	changed_image = get_image_src(driver, xpath_element)
	return actual_image != changed_image


def test_image_changed(driver):
	assert has_image_changed(driver, XPATH_CARD_IMAGE), "A imagem não foi alterada!"
	print("A imagem foi alterada!")
