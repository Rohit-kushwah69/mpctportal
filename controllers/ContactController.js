const ContactModel = require('../models/contact')
class ContactController {
    static createcontact = async (req, res) => {
        try {
            // console.log(req.body)
            const { id } = req.udata
            const { firstname, lastname, username, email, address, address2, country, state } = req.body;
            await ContactModel.create({
                firstname,
                lastname,
                username,
                email,
                address,
                address2,
                country,
                state,
                user_id: id,
            });
            // req.flash("success", "Contact Register Successfully");
            // res.render('/contact',{msg:req.flash("success")})
            res.redirect("/contact");
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = ContactController