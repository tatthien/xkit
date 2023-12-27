import "@mantine/core/styles.css";
import { ActionIcon, Box, MantineProvider, Stack, Text } from "@mantine/core";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Youtube from "./routes/Youtube";
import TextCaseConverter from "./routes/TextCaseConverter";
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconLetterCase,
} from "@tabler/icons-react";
import classes from "./app.module.css";
import { clsx } from "clsx";
import { BrowserOpenURL } from "../wailsjs/runtime/runtime";

const navItems = [
  {
    text: "YouTube downloader",
    link: "/",
    icon: IconBrandYoutube,
  },
  {
    text: "Text case converter",
    link: "/text-case-converter",
    icon: IconLetterCase,
  },
];

export default function App() {
  return (
    <MantineProvider>
      <HashRouter>
        <Box className={classes.wrapper}>
          <Box className={classes.sidebar}>
            <Box
              style={{ "--wails-draggable": "drag" }}
              className={classes.sidebarHeader}
            >
              <Text fw={600}>x-kit</Text>
            </Box>
            <Stack gap={2} className={classes.sidebarNav}>
              {navItems.map((item) => (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    clsx(
                      classes.sidebarLink,
                      isActive && classes.sidebarLinkActive,
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
          <Box className={classes.content}>
            <Box
              style={{ "--wails-draggable": "drag" }}
              className={classes.contentHeader}
            >
              <ActionIcon
                variant="subtle"
                component="a"
                color="gray"
                onClick={() =>
                  BrowserOpenURL("https://github.com/tatthien/xkit")
                }
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
            </Box>
            <Box p={16}>
              <Routes>
                <Route path="/" element={<Youtube />} />
                <Route
                  path="/text-case-converter"
                  element={<TextCaseConverter />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </HashRouter>
    </MantineProvider>
  );
}
