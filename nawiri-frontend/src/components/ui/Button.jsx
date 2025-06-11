
import React from 'react';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, href, ...props }, ref) => {
  const variants = {
    default: 'btn btn-primary',
    destructive: 'btn btn-danger',
    outline: 'btn btn-outline-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-link btn-ghost',
    link: 'btn btn-link',
  };

  const sizes = {
    default: '',
    sm: 'btn-sm',
    lg: 'btn-lg',
    icon: 'btn-icon',
  };

  const baseClasses = 'btn d-flex align-items-center justify-content-center text-nowrap fw-medium';
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`.trim();

  if (asChild && props.children) {
    // For cases like <Button asChild><Link>...</Link></Button>, apply classes to the child
    return React.cloneElement(props.children, {
      className: `${combinedClasses} ${props.children.props.className || ''}`.trim(),
      ref,
      ...props,
    });
  }

  if (href) {
    // Render as <a> for cases with href (e.g., in GetInvolved.jsx)
    return (
      <a
        href={href}
        className={combinedClasses}
        ref={ref}
        {...props}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      ref={ref}
      {...props}
    >
      {props.children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
