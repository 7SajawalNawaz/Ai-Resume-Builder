import { BriefcaseBusiness, Globe, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon, User, User2 } from "lucide-react";
import React from "react";

const PersonalInfoForm = ({ data, onChange, removeBg, setRemoveBg }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // input fields

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      icon: User2,
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      icon: MailIcon,
    },
    {
      key: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
      required: true,
      icon: PhoneIcon
    },
    {
    key:"location",
      label: "Location",
      type: "text",
      placeholder: "Enter your location",
      required: true,
      icon: MapPinIcon,
    },
    {
        key: "profession",
        label: "Profession",
        type: "text",
        placeholder: "Enter your profession",
        required: true,
        icon: BriefcaseBusiness
    },
    {
        key:"linkedin",
        label: "LinkedIn Profile",
        type: "url",
        placeholder: "Enter your LinkedIn profile URL",
        required: false,
        icon: LinkedinIcon
    },
    {
        key: "website",
        label: "Personal Website",
        type: "url",
        placeholder: "Enter your personal website URL",
        required: false,
        icon: Globe
    }

  ];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started by entering your personal information.
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              className="w-16 h-16 rounded-full
                        object-cover mt-5 ring ring-purple-300 hover:opacity-80"
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user image"
            />
          ) : (
            <div
              className="inline-flex items-center gap-2 mt-5 
                        text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              <User className="size-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove background</p>
            <label
              className="relative inline-flex items-center cursor-pointer
                        text-custompurple gap-3"
            >
              <input
                className="sr-only peer"
                type="checkbox"
                checked={removeBg}
                onChange={(e) => setRemoveBg((prev) => !prev)}
              />

              <div
                className="w-9 h-5 bg-purple-300 rounded-full
                            peer peer-checked:bg-custompurple transition-colors
                            duration-200"
              ></div>
              <span
                className="dot absolute left-1 top-1 w-3 h-3  bg-white
                            rounded-full transition-transform duration-200 ease-in-out 
                            peer-checked:translate-x-4"
              ></span>
            </label>
          </div>
        )}
      </div>

      {/* List of fields */}

      {
        fields.map((field)=>{
            const Icon  = field.icon
            return(
                <div key={field.key} className="space-y-1 mt-5">
                    <label className="flex items-center gap-2 text-sm font-medium
                    text-gray-500">
                        <Icon  className="size-4"/>
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}

                    </label>
                    <input type={field.type} value={data[field.key] || ""} 
                    onChange={(e)=>handleChange(field.key, e.target.value)} 
                    className="mt-1 w-full px-3 py-2 border border-gray-300
                    rounded-lg focus:ring focus:ring-custompurple focus:border-custompurple
                    outline-none transition-colors text-sm" placeholder={`${field.label.toLowerCase()}`} required={field.required}/>
                </div>
            )
        })
      }
    </div>
  );
};

export default PersonalInfoForm;
