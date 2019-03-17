﻿using Microsoft.AspNet.Identity;
using TeamProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeamProject.Controllers
{
    public class LoginController : Controller
    {
        private ProjectDbContext db = new ProjectDbContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(string email, string password)
        {
            UserManager manager = new UserManager(db);
            var loggedInUser = manager.Login(email, password);

            if (loggedInUser != null)
            {
                Session["user"] = loggedInUser;
                Session["Admin"] = loggedInUser.IsInRole("Admin") ? "Admin" : string.Empty;
                Session["Owner"] = loggedInUser.IsInRole("Owner") ? "Owner" : string.Empty;

                ViewBag.Name = loggedInUser.Firstname;
                return RedirectToAction("index", "home");
            }
            else
            {
                return RedirectToAction("index");
            }
        }

        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            Request.GetOwinContext().Authentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        public ActionResult AccessDenied()
        {
            return View();
        }
    }
}
