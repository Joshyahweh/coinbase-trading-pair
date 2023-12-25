# Coinbase crypto pair project

> Develop an iOS app in Swift with the following functionalities:

> Show a list of all cryptocurrency trading pairs of Coinbase Pro
> The list should have a search function
> When you tap on a trading pair a detail screen should appear that shows the current price
> The price should be periodically updating
> Please use the Coinbase Pro/Exchange API to pull data (it's free for this use case with no API key): https://api.exchange
> coinbase.com/products

> Make it possible to mark trading pairs as favorites. Favorites should be shown at the top of the list and saved persistently 
> (i.e. they should exist post restart of the app).


> A plus: You can abstract the product model in such a way that if we change the provider from Coinbase to someone else, there 
> should be minimum change in code and testing required. You can explain your solution to the best of your ability.


## Setup & Installation
-   Run With Docker
-   Run Locally



### Run With Docker

First you need to clone this project:

```sh
$ git clone https://github.com/Joshyahweh/trading-pair-coinbase.git
```

Download Expo go app on your mobile phone.
[![Andriod](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1)
[![Apple](https://apps.apple.com/us/app/expo-go/id982107779)

Build the docker file

```sh
$ docker build -t coinbase-trading-pair 
```

Run to start the application
```sh
$ docker run -p 8081:8081 -p 19000:19000 -p 19001:19001 -it coinbase-trading-pair
```
Next, Scan the Qrcode with your Expo go app


### Run Locally

To set up your local, ensure you have the following pre-installed:

-   NodeJS 20+ (LTS)
-   Yarn
-   Expo Go (Android/IOS)
-   Github CLI

Then you need to clone this project:

```sh
$ git clone https://github.com/Joshyahweh/trading-pair-coinbase.git
```

 Install all packages

 ```sh
$ yarn
```

Start the app

```sh
$ yarn dev
```

Next, Scan the Qrcode with your Expo go app