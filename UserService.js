function UserService(userRepository, appRouter) {
    const _self = this;
    const repository = userRepository;
    const router = appRouter;

    const loginWithUserAndPasswordAndRedirect = function (user, password) {
        if (_self.repository.isLoginValid(user, password)) {
            user = _self.repository.get(user);
            _self.generateVectorForUser(user);
            _self.appRouter.redirect('home');
        } else {
            _self.appRouter.addFlashError('Invalid User/Password');
            _self.appRouter.redirect('login');
        }
    };

    const generateVectorForUser = function (user) {
        vector = [];

        for (var i = 0; i < 10; i++) {
            vector[i] = typeof vector[i] !== 'undefined' ? vector[i] : [];
            for (var j = 0; j < 10; j++) {
                vector[i][j] = typeof vector[i][j] !== 'undefined' ? vector[i][j] : [];
                vector[i][j] = user.getVectorInfo(i, j) + 1;
            }
        }

        user.setVectorInfo(vector);
    };

    return {
        'loginWithUserAndPasswordAndRedirect': loginWithUserAndPasswordAndRedirect,
        'generateVectorForUser': generateVectorForUser,
    };
}
