### Introduction 
It is a node js command line application with create/list/take an order to simulate a very simple Lalamove

### Technology choices
A simple node js application with yargs and file system library.
Yargs is used to collect user input
File system is used to edit the simulate database, which is a json file

### Database 
I use a simple database.json file as a database

### setup.sh
setup.sh is used to install npm and run npm install. 
Also, `npm install -g` will add the application command globally

### Usage
`create_order [from] [to]`
returns a unique ID for this order.
from and to are required.

`list_orders`
List all the available (non-taken) orders with this format
`ID,FROM,TO\n`

`take_order [id]`
Try to take the order with the given ID, returns an error if order is already taken.
id is required.