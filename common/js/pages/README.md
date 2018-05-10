Pages
Every URL on application belongs to ONE page.

## Responsibilities

### Defines layout of a Page & combines various sections inside the layout.
e.g. a standard sidemenu layout can be written as

```
<div className="cf min-vh-100 ph2 ph0-m">
    <div className="fl w-20 w-100-m vh-100 overflow-y-scroll bg-light-gray">
    <SidenavSection />
    </div>
    <div className="fl w-80 w-100-m pa3 vh-100 overflow-y-scroll">
        <DashboardListSection />
        <FooterSection />
    </div>
</div>
```

### API call to fetch Page data
- Page dispatch Ducks actions responsible to fetch all data required to render page in `componentDidMount`.
e.g. 
```
componentDidMount() {
    const { profile, ProfileDucks } = this.props;
    if (!profile) {
        ProfileDucks.getProfile();
    }
}
```

### API call to fetch Page Server Side mandatory data. 
- It dispatch Ducks actions responsible to fetch Server rendering mandatory data in `Page.fetchData`
- Make sure to check for state data in 'componentDidMount' to avoid unnecessary calls for data which is already fetched via `fetchData`.
e.g.
```
Page.fetchData = ({ store }) => {
    return store.dispatch(ProfileDucks.getProfile());
}
```

### Reset page specific state while leaving page.
- Use `componentWillUnmount` to dispatch reset state actions.
e.g. 
```
componentWillUnmount() {
    ProfileDucks.resetProfile();
}
```
