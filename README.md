# Pioneer Colony

This repository contains the management scripts for the Pioneer Colony


## Run Tests

### Start a test blockchain
In a new terminal window:
```
~/PioneerColony$ yarn start-ganache
```

### Deploy the colonyNetwork to ganache
```
~/PioneerColony$ yarn deploy-contracts
```

### Start TrufflePig
In a new terminal window, `cd` to the PioneerColony and start TrufflePig with
```
~/PioneerColony$ yarn start-trufflepig
```

### Run Tests
```
~/PioneerColony$ yarn test
```