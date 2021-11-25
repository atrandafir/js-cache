# js-cache
A javascript cache component for localstorage

# First load the script

TBD

# Second, call this to restore the cache data from local storage back into the component

```
// restoring from local cache
jsCache.restoreFromLocalStorage();
```

# Third, this is how you use it

```
// first try to get the data from the cache
var achievements=jsCache.get('achievements', null);

if (achievements !== null) {
  // means you got the data, so you can just return
	return;
} else {
  // if no data, then load it, example, from an API call
  var response=await apiCall('/some/api');
  // save the data into the cache for the next time, and also set the expiration time
  jsCache.set('achievements', response, 10);
}
```
