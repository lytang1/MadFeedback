import os
import unittest
import time
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction
from appium.webdriver.common.multi_action import MultiAction

class AppiumTest(unittest.TestCase):
  def setUp(self):
    platformName='iOS'
    path='~/Desktop/PLVY.app'
    device_info = os.system('adb shell getprop ro.build.version.release')
    model=os.system('adb shell getprop ro.semc.product.name')
    if device_info is not None and device_info !=256:
       platformName= 'Android'
       path='./android/app/build/outputs/apk/app-release.apk'
    else:
       platformName='iOS'
       path='~/Desktop/MADFeedBack.app'

    if platformName == 'Android':
       self.driver = webdriver.Remote(
          command_executor='http://127.0.0.1:4723/wd/hub',
          desired_capabilities={
            'app': os.path.expanduser(path),
            'platformName': platformName,
            'full-reset' : False,
            'no-reset': True,
            'enablePerformanceLogging': False,
            'deviceName': str(model)+' API API 22'
          })
    else:
      self.driver = webdriver.Remote(
       command_executor='http://127.0.0.1:4723/wd/hub',
       desired_capabilities={
         'app': os.path.expanduser('~/Desktop/MADFeedBack.app'),
             'platformName': 'iOS',
             'deviceName': 'iPhone',
             'platformVersion' : '10.3',
             'udid':'1ed2c80f71cb7615bc48ee8037fc278f0167d725',
             'automationName': 'XCUITest',
             # 'deviceName': 'iPhone 6s Plus',
   })

  def tearDown(self):
    self.driver.quit()


class EmailLoginTests(AppiumTest):
  def test_submit_feedback_without_select_user(self):
    time.sleep(5)
    user = self.driver.find_element_by_accessibility_id('Users')
    self.assertIsNotNone(user)
    category_button = self.driver.find_element_by_accessibility_id('category_selectbox')
    category_button.click()
    time.sleep(2)
    category_selections = self.driver.find_elements_by_accessibility_id('categories')
    self.assertEqual(5, len(category_selections))
    category_selections[0].click()
    time.sleep(2)
    # rating_stars = self.driver.find_elements_by_accessibility_id('rating')
    # rating_stars[4].click()
    send_button = self.driver.find_element_by_accessibility_id('send_button')
    send_button.click()
    time.sleep(2)
    source = self.driver.page_source
    self.assertNotEqual(-1, source.find('"Please tell us who you are "'))

  def test_submit_feedback_without_select_category(self):
    time.sleep(5)
    users = self.driver.find_elements_by_accessibility_id('Users')
    self.assertIsNotNone(users)
    users[0].click()
    time.sleep(2)
    # rating_stars = self.driver.find_elements_by_accessibility_id('rating')
    # rating_stars[4].click()
    send_button = self.driver.find_element_by_accessibility_id('send_button')
    send_button.click()
    time.sleep(1)
    source = self.driver.page_source
    print source
    self.assertNotEqual(-1, source.find('"Please select a category before submitting the form"'))

  def test_submit_feedback_without_rating(self):
    time.sleep(5)
    users = self.driver.find_elements_by_accessibility_id('Users')
    self.assertIsNotNone(users)
    users[0].click()
    category_button = self.driver.find_element_by_accessibility_id('category_selectbox')
    category_button.click()
    time.sleep(2)
    category_selections = self.driver.find_elements_by_accessibility_id('categories')
    self.assertEqual(5, len(category_selections))
    category_selections[0].click()
    time.sleep(2)
    # rating_stars = self.driver.find_elements_by_accessibility_id('rating')
    # rating_stars[4].click()
    send_button = self.driver.find_element_by_accessibility_id('send_button')
    send_button.click()
    time.sleep(1)
    source = self.driver.page_source
    self.assertNotEqual(-1, source.find('"Please rate us before submitting the form"'))


  # def test_submit_feedback_form_correctly_without(self):
  #   time.sleep(5)
  #   users = self.driver.find_elements_by_accessibility_id('Users')
  #   self.assertIsNotNone(users)
  #   users[0].click()
  #   category_button = self.driver.find_element_by_accessibility_id('category_selectbox')
  #   category_button.click()
  #   time.sleep(2)
  #   category_selections = self.driver.find_elements_by_accessibility_id('categories')
  #   self.assertEqual(5, len(category_selections))
  #   category_selections[0].click()
  #   time.sleep(2)
  #   rating_stars = self.driver.find_elements_by_accessibility_id('rating')
  #   rating_stars[4].click()
  #   send_button = self.driver.find_element_by_accessibility_id('send_button')
  #   send_button.click()
  #   time.sleep(1)
  #   success = self.driver.find_element_by_accessibility_id('toast')
  #   self.assertIsNotNone(success)
  #   source = self.driver.page_source
  #   self.assertNotEqual(-1, source.find("'Your feedback have been submitted successfully.'"))

  def is_android_device(self):
    device_info = os.system('adb shell getprop ro.build.version.release')
    if device_info is not None and device_info !=256:
      return True
    else:
      return False
