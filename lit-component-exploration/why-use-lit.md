# Why Use Lit?

## Vanilla Web Components

Every time your data changes, you have to:
1. Manually call `render()`
2. Re-attach all event listeners 

```javascript
_increment() {
    this._count++;
    this.render();              
    this._attachListeners();   
}
```

## What Lit Does

Lit automates the boring parts:
1. **Auto re-renders** when properties change
2. **Keeps event listeners** - no re-attaching

```javascript
_increment() {
    this.count++;  // Done! Lit handles the rest
}
```

Same output, less work.

The lab uses Lit because it's less code and fewer bugs, based on my exploration I will keep it in the lab.
