import datetime

from utils import get_element_text

XPATH_CLOCK_TEXT = "//h2[@id='clock']"


def has_clock_changed(driver, xpath_element):
    site_time = get_element_text(driver, xpath_element)
    now = datetime.datetime.now()
    actual_time = now.strftime("%H:%M")
    return site_time != actual_time


def test_clock_is_correct(driver):
    assert not has_clock_changed(driver, XPATH_CLOCK_TEXT), "O relógio do site não está correto!"
    print("O relógio do site está correto!")
