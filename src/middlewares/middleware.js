exports.middlewareGlobal = (req, res, next) => {
    res.locals.sucess = req.flash('sucess')
    res.locals.error = req.flash('error');
    next();    
};

exports.checkCsrfError = (erro, req, res, next) => {
    if (erro && erro.code === 'EBADCSRFTOKEN') {
        return res.send('Formulário corrompido.');
    }
        next();
    };

    exports.csrfMiddleware = (req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    };

    exports.addCsrfToken = (req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    };