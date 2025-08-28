var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useLocation, useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, User, Phone, Mail, Building, Award, Users, Calendar, Map as Map$1, Download, MapPin, Car, Plane, Train, ShoppingBag, GraduationCap, Hospital, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const PerformanceMonitor = () => {
  useEffect(() => {
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (window.gtag) {
          window.gtag("event", "LCP", {
            value: Math.round(lastEntry.startTime),
            event_category: "Performance"
          });
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (window.gtag) {
            window.gtag("event", "FID", {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: "Performance"
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            if (window.gtag) {
              window.gtag("event", "CLS", {
                value: Math.round(clsValue * 1e3) / 1e3,
                event_category: "Performance"
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      const checkMobilePerformance = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          if ("getBattery" in navigator) {
            navigator.getBattery().then((battery) => {
            });
          }
        }
      };
      window.addEventListener("load", () => {
        setTimeout(checkMobilePerformance, 1e3);
      });
      return () => {
        lcpObserver?.disconnect();
        fidObserver?.disconnect();
        clsObserver?.disconnect();
      };
    }
  }, []);
  return null;
};
const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
    if (typeof window !== "undefined" && window._hsq) {
      window._hsq.push(["setPath", location.pathname]);
      window._hsq.push(["trackPageView"]);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pageView", {
        detail: {
          path: location.pathname,
          title: document.title,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }));
    }
  }, [location]);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 hover:shadow-xl transition-transform",
  {
    variants: {
      variant: {
        default: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 shadow-lg",
        accent: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 shadow-lg",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-lg",
        hero: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg",
        heroBrochure: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-lg border-2 border-tertiary"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
class HubSpotIntegration {
  // Submit to HubSpot using Forms API (no token required)
  static async submitToForm(formType, data) {
    const formId = this.FORM_IDS[formType];
    if (!formId) {
      throw new Error(`Form type '${formType}' not found`);
    }
    try {
      const formData = new FormData();
      formData.append("firstname", data.name);
      formData.append("email", data.email);
      formData.append("mobilephone", data.phone);
      formData.append("consent", data.consent ? "Yes" : "No");
      formData.append("form_type", formType);
      formData.append("source", data.additionalData?.source || "Website Form");
      formData.append("page_url", window.location.href);
      if (data.additionalData) {
        Object.entries(data.additionalData).forEach(([key, value]) => {
          if (key !== "source" && key !== "page_url") {
            formData.append(key, value);
          }
        });
      }
      const response = await fetch(
        `https://forms.hubspot.com/uploads/form/v2/${this.PORTAL_ID}/${formId}`,
        {
          method: "POST",
          body: formData
        }
      );
      if (response.ok) {
        return { success: true };
      } else {
        console.error(`HubSpot form submission failed: ${response.status}`);
        return { success: false, error: `HTTP ${response.status}` };
      }
    } catch (error) {
      console.error("HubSpot form submission error:", error);
      return { success: false, error };
    }
  }
  // Submit to both existing form system and HubSpot
  static async submitToBoth(formType, data) {
    const promises = [];
    promises.push(
      this.submitToForm(formType, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        consent: data.consent,
        additionalData: data.additionalData
      })
    );
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }
}
// Your HubSpot Portal ID
__publicField(HubSpotIntegration, "PORTAL_ID", "243445377");
// Your HubSpot Form IDs
__publicField(HubSpotIntegration, "FORM_IDS", {
  "download": "47035467-fe7b-41e3-97f8-95911bf62a81",
  "lead-capture": "6dd5e24e-751b-4a53-a8fa-906cef78531d",
  "site-visit": "033be23e-d934-4b0e-a647-de16b11409ca"
});
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").nonempty("Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) })
});
const ContactForm = ({ isOpen, onClose, title = "Get in Touch" }) => {
  const [thankYou, setThankYou] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast: toast2 } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      consent: false
      // Type assertion to handle the literal type
    }
  });
  const PURPOSE_OPTIONS = [
    "About - Learn More About Godrej",
    "Floor Plan - Download Floor Plans",
    "Project Highlights - Schedule Site Visit",
    "Amenities - Schedule Amenities Tour",
    "Learn More About Location",
    "Get in Touch"
  ];
  function getPurposeValue(title2) {
    if (!title2) return "Get in Touch";
    if (PURPOSE_OPTIONS.includes(title2)) return title2;
    if (title2.includes("About")) return "About - Learn More About Godrej";
    if (title2.includes("Floor Plan")) return "Floor Plan - Download Floor Plans";
    if (title2.includes("Project Highlights")) return "Project Highlights - Schedule Site Visit";
    if (title2.includes("Amenities")) return "Amenities - Schedule Amenities Tour";
    if (title2.includes("Location")) return "Learn More About Location";
    return "Get in Touch";
  }
  function getHubSpotFormType(title2) {
    if (title2.includes("Floor Plan") || title2.includes("Download")) {
      return "download";
    } else if (title2.includes("Site Visit") || title2.includes("Schedule")) {
      return "site-visit";
    } else {
      return "lead-capture";
    }
  }
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("entry.1338687725", data.name);
      formPayload.append("entry.1492404407", data.phone);
      formPayload.append("entry.1765571584", data.email);
      formPayload.append("entry.1294608166", getPurposeValue(title));
      formPayload.append("entry.182177265", data.consent ? "I agree to be contacted regarding my enquiry" : "");
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmhAoHV0oaodPJsJuhcXyDF554xaGkKqaQAkXTd-lCmGexaA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formPayload
      });
      const hubSpotFormType = getHubSpotFormType(title);
      await HubSpotIntegration.submitToForm(hubSpotFormType, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        consent: data.consent,
        additionalData: {
          source: title,
          page_url: window.location.href
        }
      });
      reset();
      onClose();
      navigate("/thank-you");
    } catch (err) {
      console.error("Form submission error:", err);
      toast2({
        title: "Submission failed",
        description: "There was a problem submitting your enquiry. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  let userTitle = title;
  if (title && title.includes(" - ")) {
    userTitle = title.split(" - ").slice(1).join(" - ");
  }
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: () => {
    setThankYou(null);
    onClose();
  }, children: /* @__PURE__ */ jsx(
    DialogContent,
    {
      style: { borderRadius: "10px" },
      onPointerDownOutside: onClose,
      children: /* @__PURE__ */ jsxs("div", { className: "px-[20px] pr-[30px]", children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-center text-xl font-bold text-primary", children: thankYou ? "Thank You!" : userTitle }) }),
        thankYou ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground mb-6", children: thankYou }),
          /* @__PURE__ */ jsx(Button, { className: "mx-auto", onClick: () => {
            setThankYou(null);
            onClose();
          }, children: "Close" })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-primary" }),
              "Full Name"
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                ...register("name"),
                placeholder: "Enter your full name",
                autoComplete: "name"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.name.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-primary" }),
              "Phone Number"
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                ...register("phone"),
                placeholder: "Enter your phone number",
                autoComplete: "tel"
              }
            ),
            errors.phone && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.phone.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "email", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-primary" }),
              "Email Address"
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                ...register("email"),
                placeholder: "Enter your email address",
                autoComplete: "email"
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.email.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "consent",
                type: "checkbox",
                ...register("consent"),
                className: "accent-primary w-4 h-4"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "consent", className: "text-sm select-none cursor-pointer", children: "I agree to be contacted regarding my enquiry" })
          ] }),
          errors.consent && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.consent.message }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "cta", className: "w-full mt-6", disabled: submitting, children: submitting ? "Submitting..." : "Submit Inquiry" })
        ] }),
        !thankYou && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center mt-4", children: "By submitting this form, you agree to receive updates about Godrej Thanisandra." })
      ] })
    }
  ) });
};
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setIsHydrated(true);
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return { ref, isVisible: isHydrated ? isVisible : false };
};
const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(null);
  const { ref, isVisible } = useScrollAnimation();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { ref, className: `relative min-h-screen flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center overflow-hidden pt-16 md:pt-32 pb-8 md:pb-0 transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-0 right-0 z-20 hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/Assets/id98Oz8z3__logos.svg",
          alt: "Godrej Logo",
          className: "w-32 h-auto md:w-40"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold italic", style: {
        background: "linear-gradient(135deg, #5FB233 0%, #4187CE 50%, #BD1362 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }, children: "Authorized Marketing Partner" })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsFormOpen("enquire"),
        className: "hidden md:flex fixed z-50 !bg-[#56A7E0] text-white font-bold py-3 px-4 rounded-l-2xl shadow-xl hover:scale-105 transition-all duration-300 items-center justify-center enquire-now-animate top-1/2 right-0 -translate-y-1/2",
        style: {
          marginRight: 0,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "normal",
          height: "auto",
          minWidth: "80px",
          whiteSpace: "nowrap"
        },
        children: "Book a Free Consultation"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/Assets/Godrej.png",
        alt: "Godrej Thanisandra",
        className: "absolute inset-0 w-full h-full object-cover z-0",
        style: { objectFit: "cover", objectPosition: "center" },
        decoding: "async"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 left-4 right-4 z-20 md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-start", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/Assets/id98Oz8z3__logos.svg",
          alt: "Godrej Logo",
          className: "w-24 h-auto"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold italic", style: {
        background: "linear-gradient(135deg, #5FB233 0%, #4187CE 50%, #BD1362 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }, children: "Authorized Marketing Partner" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-16 left-4 right-4 z-20 md:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white text-left", children: "Godrej Thanisandra" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl mb-6 font-light text-white text-left", children: "Where Luxury Meets Comfort in North Bangalore" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            className: "px-8 py-3 text-lg font-semibold w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] rounded-xl",
            onClick: () => setIsFormOpen("sitevisit"),
            children: "Schedule Site Visit"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-row gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-yellow-300 mb-1", children: "2-3 BHK" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs", children: "Premium Apartments" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-yellow-300 mb-1", children: "45+" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs", children: "World-Class Amenities" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-yellow-300 mb-1", children: "Prime" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs", children: "North Bangalore Location" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4 w-full hidden md:flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-start justify-center text-left text-white py-16 md:py-24 w-full", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight w-full text-left", children: "Godrej Thanisandra" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 font-light w-full text-left", children: "Where Luxury Meets Comfort in North Bangalore" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8 w-full", children: /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            className: "px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]",
            onClick: () => setIsFormOpen("sitevisit"),
            children: "Schedule Site Visit"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:gap-6 w-full md:w-auto md:ml-16 mt-8 md:mt-0 mb-8 md:mb-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2", children: "2-3 BHK" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs md:text-base", children: "Premium Apartments" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2", children: "45+" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs md:text-base", children: "World-Class Amenities" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2", children: "Prime" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 text-xs md:text-base", children: "North Bangalore Location" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen === "sitevisit",
        onClose: () => setIsFormOpen(null),
        title: "Hero - Schedule Site Visit"
      }
    ),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen === "enquire",
        onClose: () => setIsFormOpen(null),
        title: "Hero - Enquire Now"
      }
    )
  ] }) });
};
const AboutSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const achievements = [
    { icon: Building, label: "125+ Years", desc: "of Trust & Excellence" },
    { icon: Award, label: "Awards", desc: "Multiple Industry Awards" },
    { icon: Users, label: "100K+", desc: "Happy Families" },
    { icon: Calendar, label: "Legacy", desc: "Since 1897" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#F7F8FA] transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          "About ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Godrej Thanisandra" }),
          /* @__PURE__ */ jsx("br", {}),
          "North Bangalore"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Godrej Properties brings you the finest residential experience in North Bangalore with Godrej Thanisandra, a premium project that combines luxury, comfort, and convenience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/Assets/godrej-about-section%20.png",
            alt: "Godrej Thanisandra Building",
            className: "rounded-2xl shadow-2xl w-full h-[400px] object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Premium Living Redefined" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Nestled in the rapidly developing Thanisandra region of North Bangalore, Godrej Thanisandra offers meticulously planned 2 and 3 BHK apartments designed for the modern family. With world-class amenities and strategic connectivity to IT corridors, this project represents the perfect blend of luxury and practicality." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-primary rounded-full mt-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Prime location in North Bangalore with excellent connectivity" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-secondary rounded-full mt-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Thoughtfully designed apartments with modern amenities" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-accent rounded-full mt-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Close proximity to schools, hospitals, and shopping centers" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "cta",
              size: "lg",
              onClick: () => setIsFormOpen(true),
              className: "mt-6",
              children: "Learn More About Project"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-3xl p-4 md:p-6 shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-5xl font-bold mb-4", children: [
            "The ",
            /* @__PURE__ */ jsx("span", { style: { color: "#B9105E" }, children: "Godrej Legacy" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "For over 125 years, Godrej has been synonymous with trust, quality, and innovation. Our commitment to excellence continues with every project we undertake." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 sm:gap-6 w-full", children: achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center min-w-[90px] max-w-[120px] flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-2", children: /* @__PURE__ */ jsx(IconComponent, { className: "h-8 w-8 text-white" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-base md:text-lg mb-1", children: achievement.label }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-muted-foreground", children: achievement.desc })
          ] }, index);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: "About - Learn More About Godrej Thanisandra"
      }
    )
  ] });
};
const ProjectHighlights = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const highlights = [
    {
      title: "Expansive 7-Acre Low-Density Community",
      description: "A thoughtfully designed premium enclave with just 558 residences, ensuring abundant open spaces and enhanced privacy.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Expansive%207-Acre.png"
    },
    {
      title: "Well-Planned 2BHK & 3BHK Homes",
      description: "Generously sized residences featuring large balconies, crafted to offer exceptional comfort, modern amenities, and a prime address near Reva College in North Bangalore.",
      image: "/Assets/Project-Highlights/Godrej%20-%202bhk%203bhk.png"
    },
    {
      title: "Strategic North Bangalore Location",
      description: "Situated in a thriving growth corridor that perfectly blends the vibrancy of city life with the tranquility of suburban living.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Strategic%20North%20Bangalore.png"
    },
    {
      title: "Versatile Floor Plans",
      description: "Luxury 2 BHK and 3 BHK layouts tailored to suit a variety of family lifestyles and requirements.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Versatile%20Floor%20Plans.png"
    },
    {
      title: "Smart, Spacious Design",
      description: "Homes emphasize natural ventilation and daylight, seamlessly blending functionality with comfort.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Smart,%20Spacious%20Design.png"
    },
    {
      title: "Modern Architecture with a Green Touch",
      description: "Contemporary design highlighted by landscaped terraces, merging aesthetics with sustainability.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Modern%20Architecture%20with%20a%20Green%20Touch.png"
    },
    {
      title: "On-Site Commercial Amenities",
      description: "Integrated retail and convenience spaces within the development, offering everyday essentials at your doorstep.",
      image: "/Assets/Project-Highlights/Godrej%20-%20On-Site%20Commercial%20Amenities.png"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#F9F6F3] transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Godrej Thanisandra" }),
          /* @__PURE__ */ jsx("br", {}),
          "Project Highlights"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Discover the exceptional features that make Godrej Thanisandra the perfect choice for your dream home in North Bangalore." })
      ] }),
      /* @__PURE__ */ jsx("style", { children: `
            @keyframes timeline-shimmer {
              0% { background-position: 0% 0%; }
              100% { background-position: 0% 100%; }
            }
            .timeline-animated-line {
              background: linear-gradient(to bottom, #a5b4fc 0%, #f472b6 100%);
              background-size: 100% 200%;
              animation: timeline-shimmer 2s linear infinite alternate;
            }
            .timeline-node-animate {
              animation: timeline-node-pulse 1.2s cubic-bezier(0.4,0,0.2,1) both;
            }
            @keyframes timeline-node-pulse {
              0% { transform: scale(0.7); opacity: 0; }
              60% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .timeline-node-border-animate {
              position: relative;
              z-index: 10;
            }
            .timeline-node-border-animate::before {
              content: '';
              position: absolute;
              inset: -4px;
              border-radius: 9999px;
              background: conic-gradient(from 0deg, #B9105E, #3777C5, #56A7E0, #B9105E 100%);
              z-index: -1;
              animation: border-spin 2.5s linear infinite;
            }
            @keyframes border-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          ` }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-0 bottom-0 w-1 rounded-full z-0 timeline-animated-line" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-12", children: highlights.map((highlight, index) => /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row items-start md:items-center gap-6 z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg z-10 border-4 border-white timeline-node-animate timeline-node-border-animate", children: /* @__PURE__ */ jsx("img", { src: highlight.image, alt: highlight.title, className: "w-14 h-14 object-cover rounded-full" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white rounded-2xl shadow-md p-6 md:ml-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-2", children: highlight.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: highlight.description })
          ] })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold mb-4", children: "Ready to Experience Premium Living?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-6 text-white/90 max-w-2xl mx-auto", children: "Don't miss out on this opportunity to own your dream home in one of Bangalore's most sought-after locations." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "lg",
            className: "border-white text-white",
            style: { background: "#B9105E", border: "none" },
            onMouseOver: (e) => {
              e.currentTarget.style.background = "#B9105E";
              e.currentTarget.style.color = "#fff";
            },
            onMouseOut: (e) => {
              e.currentTarget.style.background = "#B9105E";
              e.currentTarget.style.color = "#fff";
            },
            onClick: () => setIsFormOpen(true),
            children: "Schedule Site Visit"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: "Project Highlights - Schedule Site Visit"
      }
    )
  ] });
};
const MasterPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(null);
  const { ref, isVisible } = useScrollAnimation();
  const downloadOptions = [
    {
      title: "Master Plan",
      description: "Complete layout and site plan",
      icon: Map$1,
      format: "PDF",
      size: "2.3 MB"
    },
    {
      title: "Brochure",
      description: "Complete project brochure with details",
      icon: Download,
      format: "PDF",
      size: "8.5 MB"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#EAF3FB] transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          "Godrej Thanisandra ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Master Plan" }),
          /* @__PURE__ */ jsx("br", {}),
          "& Project Details"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Get complete project documentation including master plan, floor plans, and detailed brochures to help you make an informed decision." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center mb-0", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/Assets/godrej-master.png",
            alt: "Master Plan Preview",
            className: "rounded-2xl shadow-2xl w-full h-[400px] object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl md:text-3xl font-bold", children: [
            "Comprehensive Project ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Documentation" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Access detailed project documentation including master plans, floor plans, amenity layouts, and pricing information. Our comprehensive documentation package provides all the information you need to understand the project scope and make an informed investment decision." }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: downloadOptions.map((option, index) => {
            const IconComponent = option.icon;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(IconComponent, { className: "h-6 w-6 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground", children: option.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: option.description })
                  ] })
                ]
              },
              index
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "default",
              size: "lg",
              className: "gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]",
              onClick: () => setIsFormOpen("expert"),
              children: "Talk to Our Expert"
            }
          ) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen === "expert",
        onClose: () => setIsFormOpen(null),
        title: "Master Plan - Talk to Our Expert"
      }
    )
  ] });
};
const AmenitiesSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const amenities = [
    {
      name: "CLUB HOUSE",
      image: "/Assets/Amenities/CLUB-HOUSE.png",
      desc: "Premium club house for recreation and gatherings."
    },
    {
      name: "MINI THEATRE",
      image: "/Assets/Amenities/MINI-THEATRE.png",
      desc: "Enjoy movies and events in a private mini theatre."
    },
    {
      name: "LOTUS POND",
      image: "/Assets/Amenities/MINI-THEATRE (1).png",
      desc: "Serene lotus pond for relaxation and scenic beauty."
    },
    {
      name: "BADMINTON COURT",
      image: "/Assets/Amenities/BADMINTON-COURT.png",
      desc: "Indoor badminton court for sports enthusiasts."
    },
    {
      name: "BUSINESS CENTRE",
      image: "/Assets/Amenities/BUSINESS-CENTRE.png",
      desc: "Modern business centre for meetings and work."
    },
    {
      name: "SWIMMING POOL",
      image: "/Assets/Amenities/SWIMMING-POOL-SPA-SAUNA.png",
      desc: "Large swimming pool for leisure and fitness."
    },
    {
      name: "SPA & SAUNA",
      image: "/Assets/Amenities/SPA-SAUNA.png",
      desc: "Relax and rejuvenate at the spa and sauna."
    },
    {
      name: "YOGA & MEDITATION DECK",
      image: "/Assets/Amenities/YOGA-MEDITATION-DECK.png",
      desc: "Dedicated deck for yoga and meditation."
    },
    {
      name: "RESTAURANT",
      image: "/Assets/Amenities/RESTAURANT.png",
      desc: "On-site restaurant for fine dining."
    },
    {
      name: "GYM",
      image: "/Assets/Amenities/gym.png",
      desc: "State-of-the-art gym for your fitness needs."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#F7FAF7] transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Godrej Thanisandra" }),
          /* @__PURE__ */ jsx("br", {}),
          "Amenities"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Experience a lifestyle of luxury with our comprehensive range of world-class amenities designed for your comfort, convenience, and well-being." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: amenities.map((amenity, index) => /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl shadow-xl overflow-hidden group h-48 flex items-end hover:shadow-2xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("img", { src: amenity.image, alt: amenity.name, className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent", children: /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg text-white drop-shadow-md", children: amenity.name }) })
      ] }, index)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 text-white text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold mb-4", children: "45+ World-Class Amenities" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-6 text-white/90 max-w-2xl mx-auto", children: "From fitness and recreation to safety and convenience, every amenity is designed to enhance your living experience." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "default",
            size: "lg",
            className: "text-white",
            style: { background: "#B9105E", border: "none" },
            onMouseOver: (e) => {
              e.currentTarget.style.background = "#B9105E";
              e.currentTarget.style.color = "#fff";
            },
            onMouseOut: (e) => {
              e.currentTarget.style.background = "#B9105E";
              e.currentTarget.style.color = "#fff";
            },
            onClick: () => setIsFormOpen(true),
            children: "Schedule Amenities Tour"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-2 md:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-primary mb-2", children: "45+" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Premium Amenities" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-secondary mb-2", children: "80%" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Green Spaces" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-accent mb-2", children: "24/7" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Security & Support" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-tertiary mb-2", children: "100%" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Power Backup" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: "Amenities - Schedule Amenities Tour"
      }
    )
  ] });
};
const FloorPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const floorPlanTiles = [
    {
      type: "2BHK - 1190sqft",
      image: "/Assets/godrej-2bhk%20.png"
    },
    {
      type: "2BHK - 1240sqft",
      image: "/Assets/godrej-2bhk2.png"
    },
    {
      type: "3BHK - 1800 sqft",
      image: "/Assets/godrej-3bhk%20.png"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#F6F7F9] overflow-x-hidden transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-2 sm:px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Godrej Thanisandra" }),
          /* @__PURE__ */ jsx("br", {}),
          "Floor Plans"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Explore our thoughtfully designed floor plans that maximize space utilization while ensuring optimal ventilation and natural light in every home." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: floorPlanTiles.map((plan, idx) => {
        let price = "";
        if (plan.type.startsWith("2BHK")) price = "1.53 Cr* ONWARDS";
        else if (plan.type.startsWith("3BHK")) price = "1.93Cr* ONWARDS";
        else if (plan.type.startsWith("4BHK")) price = "2.23Cr* ONWARDS";
        return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10", style: { background: "#B9105E" }, children: price }),
          /* @__PURE__ */ jsx("img", { src: plan.image, alt: plan.type, className: "w-full h-56 object-cover" }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex-1 flex flex-col justify-between min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary break-words", children: plan.type }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "default",
                className: "w-full gap-2 mt-auto",
                onClick: () => setIsFormOpen(true),
                children: "Know more about floor plan"
              }
            )
          ] })
        ] }, plan.type);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: "Floor Plan - Download Floor Plans"
      }
    )
  ] });
};
const LocationSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const locations = [
    { icon: MapPin, title: "New Airport Road (Reva College)", desc: "Prime location with excellent connectivity" },
    { icon: Building, title: "Manyata Tech Park", desc: "10 min drive" },
    { icon: Car, title: "Hebbal Junction", desc: "15 min drive via ORR" },
    { icon: Plane, title: "Kempegowda International Airport", desc: "25–30 min drive" },
    { icon: Car, title: "Outer Ring Road", desc: "Access within minutes" },
    { icon: Train, title: "Thanisandra Railway Station", desc: "5 min away" },
    { icon: ShoppingBag, title: "Supers & Local Markets", desc: "Walkable distance" },
    { icon: GraduationCap, title: "Vidyashilp Academy & Stonehill Intl", desc: "10–15 min" },
    { icon: Hospital, title: "Columbia Asia & Aster CMI Hospitals", desc: "10–15 min" },
    { icon: ShoppingBag, title: "Phoenix Market City & Orion Mall", desc: "20 km" },
    { icon: Car, title: "Whitefield", desc: "Quick access, 20 km" },
    { icon: MapPin, title: "Nagawara & Kammanahalli", desc: "5–10 min" },
    { icon: Train, title: "Future Metro", desc: "Upcoming connectivity" },
    { icon: Building, title: "BCM Vertex (2.3 Km)", desc: "10 min drive" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { ref, className: `pt-16 pb-16 bg-[#F6F8FB] transition-opacity duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Godrej Thanisandra" }),
          /* @__PURE__ */ jsx("br", {}),
          "Location"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Discover the prime location benefits of Godrej Thanisandra, offering unmatched connectivity and convenience in North Bangalore." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: locations.map((loc, idx) => {
        const Icon = loc.icon;
        let iconColor = idx % 3 === 0 ? "#B9105E" : idx % 3 === 1 ? "#3777C5" : "#56A7E0";
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-start gap-3 sm:gap-4 bg-white rounded-2xl shadow-md p-3 sm:p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 min-w-0 w-full",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0", style: { background: iconColor }, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-base mb-1 text-primary break-words", children: loc.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed break-words", children: loc.desc })
              ] })
            ]
          },
          idx
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl md:text-3xl font-bold mb-4", children: [
            "Why ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Thanisandra" }),
            " is the Perfect Choice"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Thanisandra represents the perfect balance of urban convenience and peaceful living, making it one of North Bangalore's most sought-after residential destinations." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-background rounded-xl shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary mb-2", children: "25 min" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "To Airport" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-background rounded-xl shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-secondary mb-2", children: "15 min" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "To IT Hubs" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-background rounded-xl shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-accent mb-2", children: "5 min" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "To Schools & Hospitals" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "default",
            size: "lg",
            className: "gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]",
            onClick: () => setIsFormOpen(true),
            children: "Learn More About Location"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactForm,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: "Location - Learn More About Location"
      }
    )
  ] });
};
const Footer = () => /* @__PURE__ */ jsx("footer", { style: { background: "#3b3b3b" }, className: "w-full py-6 flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-white text-[10px] text-center max-w-2xl px-4", children: [
  /* @__PURE__ */ jsx("div", { children: "Marketed by authorized channel partner" }),
  /* @__PURE__ */ jsx("div", { className: "mt-2", children: "Disclaimer : The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purposes only. This is the official website of authorized marketing partner. We may share data with RERA registered brokers/companies for further processing. We may also send updates to the mobile number/email id registered with us. All Rights Reserved. AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148" })
] }) });
const Index = () => {
  useEffect(() => {
    document.title = "Premium Apartments at Godrej Properties Thanisandra Bangalore";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand.";
      document.head.appendChild(meta);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsx(MasterPlanSection, {}),
    /* @__PURE__ */ jsx(FloorPlanSection, {}),
    /* @__PURE__ */ jsx(ProjectHighlights, {}),
    /* @__PURE__ */ jsx(AmenitiesSection, {}),
    /* @__PURE__ */ jsx(LocationSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ThankYou = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Thank You | Godrej Thanisandra";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Thanks for your enquiry. Our team will contact you shortly.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/Assets/Godrej.png",
        alt: "Background",
        className: "absolute inset-0 w-full h-full object-cover z-0",
        style: { objectFit: "cover", objectPosition: "center" },
        decoding: "async"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center", style: { background: "linear-gradient(135deg, #B9105E 0%, #3777C5 50%, #56A7E0 100%)" }, children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-10 h-10 text-white" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-bold mb-3", children: "Thank You!" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "We’ve received your enquiry. Our executive will reach out to you shortly to assist further." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/"), className: "!bg-[#B9105E] !text-white hover:!bg-[#a00d4e] px-8", children: "Return to Home" }),
        /* @__PURE__ */ jsx("a", { href: "/", className: "hidden", "aria-hidden": "true", children: "Home" })
      ] })
    ] })
  ] });
};
const sectionClass = "mb-8";
const headingClass = "text-2xl md:text-3xl font-bold mb-4 text-primary";
const subheadingClass = "text-xl font-semibold mb-2 text-secondary";
const paragraphClass = "text-base md:text-lg text-muted-foreground mb-4";
const listClass = "list-disc pl-6 mb-4 text-base md:text-lg text-muted-foreground";
const PrivacyPolicy = () => /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background py-12 px-4 md:px-0 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-8 text-primary text-center", children: "Privacy Policy" }),
  /* @__PURE__ */ jsx("div", { className: sectionClass, children: /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "Metro Experts a Real Estate Regulatory Authority (“RERA”) Registered Agent bearing RERA No: AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148. We prioritize your privacy. Our concise Privacy Policy outlines the personal information we collect through our website, including sub-domains and microsites, the purposes of collection we may share it with, and security measures in place. It also informs you about your rights, choices, and how to contact us regarding privacy concerns. We highly recommend reading this Privacy Policy before using services and/or providing personal information." }) }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Interpretations and Definitions" }),
    /* @__PURE__ */ jsxs("ul", { className: listClass, children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("b", { children: "Data" }),
        " shall mean personal information, including sensitive personal information and special category personal data (as defined under Data Protection Laws) about you, which we collect, receive, or otherwise process in connection with your use of our website and/or the Platform."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("b", { children: "Data Protection Laws" }),
        " shall mean any applicable law for the time being in force relating to the processing of Data."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("b", { children: "Service Providers" }),
        " includes entities which provide services to and to whom we may disclose your Data for a specific purpose pursuant to a written contract."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("b", { children: "Narayanan Rajesh/We" }),
        " shall mean Narayanan Rajesh, and its subsidiaries, affiliates and associate companies."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("b", { children: "User or You" }),
        " shall mean the natural person who accesses our website/pages or Platform."
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Website Content Overview" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "The contents of this landing page, containing details of properties, property photos, costs, and availability, are provided for informational and illustrative purposes only. This information is subject to change at any time. Users are hereby advised that the actual properties may differ from what is shown in photos and cost on the website and pages, and as such, no claims shall be entertained based on such representations." }),
    /* @__PURE__ */ jsx("h3", { className: subheadingClass, children: "Uses of Developer Information" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "All images, cost descriptions, logos, and other project materials featured on this landing page are presented in accordance with the respective project developer or its licensors. We are in legal agreements and established legal relationships with the said respective developer, thereby possessing the authority to advertise, market for sale, and generate leads for the respective project." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Types of Data Collected" }),
    /* @__PURE__ */ jsx("h3", { className: subheadingClass, children: "Personal Data" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "While visiting to this website, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:" }),
    /* @__PURE__ */ jsxs("ul", { className: listClass, children: [
      /* @__PURE__ */ jsx("li", { children: "Email address" }),
      /* @__PURE__ */ jsx("li", { children: "First name and last name" }),
      /* @__PURE__ */ jsx("li", { children: "Phone number" }),
      /* @__PURE__ */ jsx("li", { children: "Address, State, Province, ZIP/Postal code, City" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "We may use Personal Data for the following purposes:" }),
    /* @__PURE__ */ jsxs("ul", { className: listClass, children: [
      /* @__PURE__ */ jsx("li", { children: "To provide and maintain our Service, including to monitor the usage of our Service." }),
      /* @__PURE__ */ jsx("li", { children: "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication." }),
      /* @__PURE__ */ jsx("li", { children: "To provide Information related to the property’s sale, purchase etc. with, special offers and general information about properties, real estate services which we offer that are similar to those that you have already purchased or enquired about." }),
      /* @__PURE__ */ jsx("li", { children: "To manage Your requests: To attend and manage Your requests to Us." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "We may share Your personal information in the following situations:" }),
    /* @__PURE__ */ jsxs("ul", { className: listClass, children: [
      /* @__PURE__ */ jsx("li", { children: "With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our associates and any other subsidiaries, that We control or that are under common control with Us." }),
      /* @__PURE__ */ jsx("li", { children: "With Authorized Developers: We may disclose Your personal information with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary." }),
      /* @__PURE__ */ jsx("li", { children: "With Your consent: We may disclose Your personal information for any other purpose with Your consent." })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Retention of Your Personal Data" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "We shall retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws)." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Disclosure of Your Personal Data" }),
    /* @__PURE__ */ jsx("h3", { className: subheadingClass, children: "User's Consent" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "By using the Website/Landing Page and/or by providing information to Us through this Website/Landing Page, the User consents to the collection and use of the information disclosed by the User on the Website in accordance with this Privacy Policy." }),
    /* @__PURE__ */ jsx("h3", { className: subheadingClass, children: "Law Enforcement" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "Under certain circumstances, the We may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency)." }),
    /* @__PURE__ */ jsx("h3", { className: subheadingClass, children: "Other Legal Requirements" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:" }),
    /* @__PURE__ */ jsxs("ul", { className: listClass, children: [
      /* @__PURE__ */ jsx("li", { children: "Comply with a legal obligation." }),
      /* @__PURE__ */ jsx("li", { children: "Prevent or investigate possible wrongdoing in connection with the Service." }),
      /* @__PURE__ */ jsx("li", { children: "Protect the personal safety of Users of the Service or the public." }),
      /* @__PURE__ */ jsx("li", { children: "Protect against legal liability." })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Security of Your Personal Data" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "The security of Your Personal Data is important to Us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Children's Privacy" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, we take steps to remove that information from Our servers." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Changes to This Privacy Policy" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: sectionClass, children: [
    /* @__PURE__ */ jsx("h2", { className: headingClass, children: "Contact Us" }),
    /* @__PURE__ */ jsx("p", { className: paragraphClass, children: "To request to review, update, or delete your personal information or to otherwise reach us, please submit a request by contacting us Directly Through The Provided Contact Information On This Website." })
  ] })
] }) });
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const queryClient = new QueryClient();
const AppContent = () => {
  usePageTracking();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PerformanceMonitor, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/thank-you", element: /* @__PURE__ */ jsx(ThankYou, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }),
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
};
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(AppContent, {}) }) });
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(App, {}) }) })
);
