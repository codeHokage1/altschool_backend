exports.renderHome = (req, res) => {
	res.render("success", { user: req.user, userName: req.userName });
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        // res.redirect("/");
        return res.json({
            message: "Logged out successfully",
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
            data: null
        });
    }
};
