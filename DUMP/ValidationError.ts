ValidationError {
    name: 'ValidationError',
    value: { password: 'sd', email: 'tom@bob.com' },
    path: undefined,
    type: undefined,
    errors: [ 'password must be at least 3 characters' ],
    inner:
    [ValidationError {
    name: 'ValidationError',
    value: 'sd',
    path: 'password',
    type: 'min',
    errors: [Array],
    inner: [],
    message: 'password must be at least 3 characters',
    params: [Object]
}
],
message: 'password must be at least 3 characters'
}