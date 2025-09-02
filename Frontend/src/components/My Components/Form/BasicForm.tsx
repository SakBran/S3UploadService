import React, { Ref } from 'react';
import { Form, Spin, Input, Select, DatePicker, Checkbox } from 'antd'; // Import all used components
import { useMediaQuery } from 'react-responsive';
import type { FormInstance, FormProps, FormItemProps } from 'antd';
import type { InputProps } from 'antd/lib/input';
import type { SelectProps } from 'antd/lib/select';
import type { DatePickerProps } from 'antd/lib/date-picker';
import type { CheckboxProps } from 'antd/lib/checkbox';

interface BasicFormProps extends Omit<FormProps, 'children'> {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formRef?: Ref<FormInstance<any>> | undefined;
  readOnly?: boolean;
  loading?: boolean;
  noStyle?: boolean; // Optional prop to disable styles
}

const BasicForm: React.FC<BasicFormProps> = ({
  children,
  formRef,
  readOnly = false,
  loading = false,
  noStyle = false,
  ...formProps
}) => {
  const isMobile = useMediaQuery({ maxWidth: 769 });

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child; // Return non-React elements as is
      }

      // Define common props for disabling/read-only.
      // TypeScript will infer the `disabled` property based on this object.
      const commonInputProps = {
        disabled: readOnly,
      };

      // --- Handle Form.Item children ---
      // Check if the child is a Form.Item component
      if (child.type === Form.Item) {
        // Ensure child.props.children is treated as React.ReactNode for mapping
        const formItemChildren = (
          child as React.ReactElement<{ children?: React.ReactNode }>
        ).props.children as React.ReactNode;

        const clonedFormItemChildren = React.Children.map(
          formItemChildren,
          (itemChild) => {
            if (React.isValidElement(itemChild)) {
              // Apply commonInputProps to direct Ant Design form controls
              // You might need to cast `itemChild.type` to `any` if you don't want to list every possible type explicitly
              // For better type safety, you could list them as shown below.
              if (
                itemChild.type === Input ||
                itemChild.type === Input.TextArea || // Add TextArea if used
                itemChild.type === Input.Password || // Add Password if used
                itemChild.type === Select ||
                itemChild.type === DatePicker ||
                itemChild.type === Checkbox
                // Add other Ant Design components here as needed
              ) {
                // Merge existing props with the new disabled prop
                return React.cloneElement(itemChild, {
                  ...(itemChild.props ?? {}), // Spread existing props safely
                  ...commonInputProps, // Override/add disabled
                } as
                  | InputProps
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | SelectProps<any>
                  | DatePickerProps
                  | CheckboxProps); // Type assertion for safety
              }
            }
            return itemChild;
          }
        );

        // Clone the Form.Item, passing the new children
        return React.cloneElement(
          child as React.ReactElement<FormItemProps>,
          {
            ...(child.props as object), // Ensure props is treated as an object
            children: clonedFormItemChildren, // Override children with the new cloned children
          } as FormItemProps // Type assertion for Form.Item props
        );
      }

      // --- Handle direct input components (less common in Ant Design forms, but included for completeness) ---
      // This block handles cases where an Input, Select, etc., is directly a child of BasicForm,
      // not wrapped inside a Form.Item.
      if (
        child.type === Input ||
        child.type === Input.TextArea ||
        child.type === Input.Password ||
        child.type === Select ||
        child.type === DatePicker ||
        child.type === Checkbox
      ) {
        return React.cloneElement(child, {
          ...(child.props as object),
          ...commonInputProps,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as InputProps | SelectProps<any> | DatePickerProps | CheckboxProps); // Type assertion
      }

      // For any other element, return it as is or apply specific read-only logic
      // You might want to consider applying a read-only style or a `pointerEvents: 'none'`
      // if `disabled` isn't applicable or desired for other element types.
      return child;
    });
  };

  return (
    <div
      style={
        noStyle === false
          ? {
              backgroundColor: '#ffffff',
              borderRadius: 8,
              padding: isMobile ? '1rem' : '2rem',
              paddingBottom: '1rem',
            }
          : undefined
      }
    >
      <Spin spinning={loading} tip="Loading...">
        <Form
          ref={formRef}
          layout="vertical"
          // disabled={readOnly} // Consider enabling this, as Ant Design's Form `disabled` prop handles many cases automatically.
          {...formProps}
        >
          {renderChildren()}
        </Form>
      </Spin>
    </div>
  );
};

export default BasicForm;
