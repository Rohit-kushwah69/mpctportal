const CourseModel = require('../../models/course')
const ContactModel = require('../../models/contact')
const nodemailer = require('nodemailer')
const UserModel = require('../../models/user')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')

class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name, email, image } = req.udata;
            const totalUsers = await CourseModel.countDocuments();
            const approvedUsers = await CourseModel.countDocuments({
                status: "Approved",
            });
            const pendingUsers = await CourseModel.countDocuments({
                status: "pending",
            });
            const rejectedUsers = await CourseModel.countDocuments({
                status: "Reject",
            });
            res.render("admin/dashboard", {
                n: name,
                i: image,
                e: email,
                totalUsers,
                approvedUsers,
                pendingUsers,
                rejectedUsers,
            });
        } catch (error) {
            console.log(error);
        }
    };
    static courseDisplay = async (req, res) => {
        try {
            const { name, email, image } = req.udata
            const course = await CourseModel.find()
            res.render('admin/courseDisplay', { n: name, i: image, e: email, c: course })
        } catch (error) {
            console.log(error)
        }
    }
    static ContactDisplay = async (req, res) => {
        try {
            const { name, email, image } = req.udata
            const course = await ContactModel.find()
            res.render('admin/ContactDisplay', { n: name, i: image, e: email, c: course })
        } catch (error) {
            console.log(error)
        }
    }
    static Viewadmin = async (req, res) => {
        try {
            const { name, image } = req.udata
            const _id = req.params._id;
            //   console.log(id)
            const course = await CourseModel.findById(_id)
            // console.log(course)
            res.render('admin/view', { n: name, i: image, c: course });
        } catch (error) {
            console.log(error)
        }
    }
    static Editadmin = async (req, res) => {
        try {
            const { name, image } = req.udata;
            const _id = req.params._id;
            // console.log(id);
            const course = await CourseModel.findById(_id);
            // console.log(course);
            res.render("admin/edit", { n: name, i: image, c: course });
        } catch (error) {
            console.log(error);
        }
    }
    static Deleteadmin = async (req, res) => {
        try {
            const { name, image } = req.udata;
            const _id = req.params._id;
            // console.log(_id);
            const course = await CourseModel.findByIdAndDelete(_id);
            // console.log(course);
            //   res.render("Course/view", { n: name, i: image, c: course });
            res.redirect("/admin/coursedisplay");
        } catch (error) {
            console.log(error);
        }
    }
    static Updateadmin = async (req, res) => {
        try {
            const _id = req.params._id;
            // console.log(_id);
            const { name, email, phone, dob, address, gender, education, course } =
                req.body;
            await CourseModel.findByIdAndUpdate(_id, {
                name,
                email,
                phone,
                dob,
                address,
                gender,
                education,
                course,
            });
            req.flash("success", "Course Update Successfully");
            res.redirect("/admin/coursedisplay");
        } catch (error) {
            console.log(error);
        }
    }
    //Profile update
    // static Profile = async (req, res) => {
    //     try {
    //         const { name, image, email } = req.udata
    //         res.render("admin/Profile", { n: name, i: image, e: email, message: req.flash('error') })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // static updateprofile = async (req, res) => {
    //     try {
    //         const { id } = req.udata
    //         const { name, email, role } = req.body;
    //         if (req.files) {
    //             const user = await UserModel.findById(id);
    //             const imageID = user.image.public_id
    //             // console.log(imageID);

    //             //deleting image from Cloudinary
    //             await cloudinary.uploader.destroy(imageID);
    //             //new image update
    //             const imagefile = req.files.image;
    //             const imageupload = await cloudinary.uploader.upload(
    //                 imagefile.tempFilePath,
    //                 {
    //                     folder: "userprofile",
    //                 }
    //             );
    //             var data = {
    //                 name: name,
    //                 email: email,
    //                 image: {
    //                     public_id: imageupload.public_id,
    //                     url: imageupload.secure_url,
    //                 },
    //             };
    //         } else {
    //             var data = {
    //                 name: name,
    //                 email: email,
    //             };
    //         }
    //         await UserModel.findByIdAndUpdate(id, data);
    //         req.flash("success", "Update Profile successfully");
    //         res.redirect("/Profile");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // static changePassword = async (req, res) => {
    //     try {
    //         const { _id } = req.udata;
    //         // console.log(req.body);
    //         const { op, np, cp } = req.body;
    //         if (op && np && cp) {
    //             const user = await UserModel.findById(_id);
    //             const isMatched = await bcrypt.compare(op, user.password);
    //             //console.log(isMatched)
    //             if (!isMatched) {
    //                 req.flash("error", "Current password is incorrect ");
    //                 res.redirect("/Profile");
    //             } else {
    //                 if (np != cp) {
    //                     req.flash("error", "Password does not match");
    //                     res.redirect("/Profile");
    //                 } else {
    //                     const newHashPassword = await bcrypt.hash(np, 10);
    //                     await UserModel.findByIdAndUpdate(_id, {
    //                         password: newHashPassword,
    //                     });
    //                     req.flash("success", "Password Updated successfully ");
    //                     res.redirect("/");
    //                 }
    //             }
    //         } else {
    //             req.flash("error", "ALL fields are required ");
    //             res.redirect("/Profile");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // };
    static update_pass = async (req, res) => {
        try {
            const { name, image, email } = req.udata;
            res.render("admin/updatePass", {
                n: name,
                i: image,
                e: email,
                msg: req.flash("error"),
                msg1: req.flash("success"),
            });
        } catch (error) {
            console.log(error);
        }
    }
    static profile_update = async (req, res) => {
        try {
            const { name, image, email } = req.udata;
            res.render("admin/profileUpdate", {
                n: name,
                i: image,
                e: email,
                msg: req.flash("success"),
            });
        } catch (error) {
            console.log(error);
        }
    }
    static changePassword = async (req, res) => {
        try {
            const { id } = req.udata;
            // console.log(req.body);
            const { op, np, cp } = req.body;
            if (op && np && cp) {
                const user = await UserModel.findById(id);
                const isMatched = await bcrypt.compare(op, user.password);
                //console.log(isMatched)
                if (!isMatched) {
                    req.flash("error", "Current password is incorrect ");
                    res.redirect("/admin/update_pass");
                } else {
                    if (np != cp) {
                        req.flash("error", "Password does not match");
                        res.redirect("/admin/update_pass");
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword,
                        });
                        req.flash("success", "Password Updated by Admin successfully ");
                        res.redirect("/admin/update_pass");
                    }
                }
            } else {
                req.flash("error", "ALL fields are required ");
                res.redirect("/admin/update_pass");
            }
        } catch (error) {
            console.log(error);
        }
    }
    static updateProfile = async (req, res) => {
        try {
            const { id } = req.udata;
            const { name, email } = req.body;
            if (req.files) {
                const user = await UserModel.findById(id);
                const imageID = user.image.public_id;
                // console.log(imageID);

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID);
                //new image update
                const imagefile = req.files.image;
                const imageupload = await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder: "userprofile",
                    }
                );
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url,
                    },
                };
            } else {
                var data = {
                    name: name,
                    email: email,
                };
            }
            await UserModel.findByIdAndUpdate(id, data);
            req.flash("success", "Profile Update by Admin successfully");
            res.redirect("/admin/profile_update");
        } catch (error) {
            console.log(error);
        }
    }
    static update_status = async (req, res) => {
        try {
            const id = req.params.id;
            const { name, email, course, status, comment } = req.body
            await CourseModel.findByIdAndUpdate(id, {
                status,
                comment
            })
            if (status == "Reject") {
                this.RejectEmail(name, email, course, status, comment)
            } else {
                this.ApprovedEmail(name, email, course, status, comment)
            }
            res.redirect('/admin/Coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static RejectEmail = async (name, email, course, status, comment) => {
        //console.log(name, email, course)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "rohitkushwah6109744@gmail.com",
                pass: "thom exxn izmr mlxn",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course ${course} Reject`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                     
                    <p>Unfortunately, your course has been rejected. Please review the feedback below for further details:<br>
                   ${comment}</p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    }
    static ApprovedEmail = async (name, email, course, status, comment) => {
        console.log(name, email, course)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "rohitkushwah6109744@gmail.com",
                pass: "thom exxn izmr mlxn",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course ${course} Approved`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                   <p>We are pleased to inform you that your course has been approved! Congratulations on your hard work and dedication.<br>
                   ${comment}<p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    }
    // ApprovedUsers
    static ApprovedUsers = async (req, res) => {
        try {
            const { name, email, image } = req.udata;
            const course = await CourseModel.find({ status: "Approved" });
            res.render("admin/approvedUsers", {
                n: name,
                i: image,
                e: email,
                c: course,
            });
        } catch (error) {
            console.log(error);
        }
    };
    // PendingUsers
    static PendingUsers = async (req, res) => {
        try {
            const { name, email, image } = req.udata;
            const course = await CourseModel.find({ status: "Pending" });
            res.render("admin/pendingUsers", {
                n: name,
                i: image,
                e: email,
                c: course,
            });
        } catch (error) {
            console.log(error);
        }
    };
    // RejectUsers
    static RejectUsers = async (req, res) => {
        try {
            const { name, email, image } = req.udata;
            const course = await CourseModel.find({ status: "Reject" });
            res.render("admin/rejectUsers", {
                n: name,
                i: image,
                e: email,
                c: course,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = AdminController