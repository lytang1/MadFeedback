# MadFeedback
### Download Project(using git)
Git has 2 options to clone project:

Using ssh(to get this option work we need to add your current machine ssh public key to yout github account)

```
  git clone git@github.com:lytang1/MadFeedback.git
```
Using http(to get this option work by type username and password while clone)

```
  git clone https://github.com/weellcambodia/weell-driver.git
```

After finished clone the project:
```
  cd MadFeedback
```


### Install dependencies

```
  npm install
```

### Test
#### Install python & appium

install appium

```
  npm install -g appium
```

install python

```
  brew install python
```

Install from PyPi, as 'Appium-Python-Client'.

```
  pip install Appium-Python-Client
```

or

```
  tar -xvf Appium-Python-Client-X.X.tar.gz
  cd Appium-Python-Client-X.X
  python setup.py install
```
or

```
  git clone git@github.com:appium/python-client.git
  cd python-client
  python setup.py install
```

#### Install appium-doctor 

To verify the installation of appium we install appium-doctor

```
  npm install -g appium-doctor
```

To test run command below

```
  appium-doctor
```
Register an account to get API key to configure send email

useful links for mobile testing Get started with appium python

#### [Sample Test with appium python](https://github.com/appium/sample-code/tree/master/sample-code/examples/python)
#### [Appium Python Client](https://github.com/appium/python-client)
