﻿using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class BasicForm : BaseVM
   {
      private class FormData
      {
         public string Name { get; set; }
         public string Email { get; set; }
      }

      public BasicForm()
      {
         AddProperty<string>("Name")
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter your name (required)"
            })
            .WithRequiredValidation();

         AddProperty<string>("Email")
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Email:",
               Placeholder = "Enter your email address"
            })
            .WithPatternValidation(Pattern.Email, "Must be a valid email address.");

         AddProperty<FormData>("Register")
            .WithAttribute(new { Label = "Register" })
            .SubscribedBy(
               AddProperty<string>("ServerResponse"), submittedData => Save(submittedData));
      }

      private string Save(FormData data) => $"The name __'{data.Name}'__ with email '{data.Email}' was registered.";
   }
}