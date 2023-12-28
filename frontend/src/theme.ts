import { Button, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "dark",
  components: {
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
