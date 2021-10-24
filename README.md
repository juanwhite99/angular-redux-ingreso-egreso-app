# IngresoEgresoApp

https://juanwhite99.github.io/angular-redux-ingreso-egreso-app/

Original template took from:

- https://github.com/BootstrapDash/StarAdmin-Free-Bootstrap-Admin-Template

Dependencies:

- Node-gyp: https://github.com/nodejs/node-gyp

```
npm install -g node-gyp
npm install --g gulp-cli
```

Course:

- https://www.udemy.com/course/redux-ngrx-angular

Angular - CLI

```shell
# Optional: https://stackoverflow.com/questions/66242718/angular-11-cli-ng-generate-option-skip-tests/66242826
npx ng g c auth/login --skipTests
npx ng g c auth/register --skipTests
npx ng g c dashboard --skipTests
npx ng g c ingreso-egreso --skipTests
npx ng g c ingreso-egreso/estadistica --skipTests
npx ng g c ingreso-egreso/detalle --skipTests
npx ng g c shared/footer --skipTests
npx ng g c shared/navbar --skipTests
npx ng g c shared/sidebar --skipTests

npm i bootstrap --save

npx ng g s services/auth
npx ng g guard services/auth

```

Git Tags

```
git tag -a v1.0.0 -m "Template listo"
git push --tags
```

AngularFire

- https://github.com/angular/angularfire

- https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

- https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md

```
ng add @angular/fire
```
