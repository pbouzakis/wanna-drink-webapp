# Object Stereotypes

An object stereotype is a grouping of similar behaving objects in the system.
Traditional stereotypes are models, controllers, and views, however we can identify
new stereotypes for our systme architecture.

## Gateway
A traditional gateway is simply an object that represents some resource outside
the system (database, database table, database table row, web service, api endpoint,
filesystem, etc).

For this system we will narrow this down to objects that represet web services.
Thus no object should need to talk to native xhr / fetch api, and instead should go
thru a gateway. For each type of service in our api, we should create a custom gateway
class (suggestions: user gateway, beer selection gateway, etc).

## View Controller
These are react components that sit higher up in the view hierarchy.
Most react components should be dumb views, that require props to be injected.
View controllers can react to changes in the system, and can hold more state.
