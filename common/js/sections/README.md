Sections
- Sections are groups of components(Presentational) and/or atoms and/or other Sections joined together to form a relatively complex, distinct section of an interface (Page).
- Sections connects to application state, needed to present data to its components.
- To categorize an interface as sections, think of related business functionality components which locally combined togeather results to a distinct reusable pattern.

## Responsibilities

### Combines multiple Dumb components and/or atoms and/or other sections
- Section layouts multiple components & controls its styling.

```
<section>
  <h2 className="tc mb5">Login to Granite</h2>
  <LoginFormComponent onLoginClick={this.onLoginClick} />
</section>
```

### Connects to respective redux State
- Section will connect to its required state using `mapStateToProps`
- components will be passed this data from props.


### Describes functionality of actions that User can take from its components.
e.g.
```
onLoginClick(data) {
  const { router: { history } } = this.context;
  const { UserDucks } = this.props;
  return UserDucks.postLoginUser(data)
    .then(() => history.push('/dashboard'));
}
```
