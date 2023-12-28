import { Button, createTheme, Input, rem, TextInput } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "dark",
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: "sm",
      },
      vars: (theme, props) => {
        if (props.size === "sm") {
          return {
            wrapper: {
              "--input-height": rem(34),
            },
          };
        }

        return { wrapper: {} };
      },
    }),
    Button: Button.extend({
      defaultProps: {
        size: "sm",
        variant: "default",
      },
      vars: (theme, props) => {
        if (props.size === "sm") {
          return {
            root: {
              "--button-height": rem(34),
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});
