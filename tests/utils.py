import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait


def get_element(driver, xpath_element):
	element = WebDriverWait(driver, 2000).until(
		expected_conditions.presence_of_element_located((By.XPATH, xpath_element)))
	return element


def get_element_class(driver, xpath_element):
	element = WebDriverWait(driver, 2000).until(
		expected_conditions.presence_of_element_located((By.XPATH, xpath_element)))
	return element.get_attribute("class")


def get_element_text(driver, xpath_element):
	time.sleep(1)
	element = WebDriverWait(driver, 2000).until(
		expected_conditions.presence_of_element_located((By.XPATH, xpath_element)))
	return element.text


def get_image_src(driver, xpath_element):
	time.sleep(1)
	element = WebDriverWait(driver, 2000).until(
		expected_conditions.presence_of_element_located((By.XPATH, xpath_element)))
	return element.get_attribute("src")
