import "@mantine/core/styles.css";
import { ActionIcon, Box, MantineProvider, Stack, Text } from "@mantine/core";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Youtube from "./routes/Youtube";
import TextCaseConverter from "./routes/TextCaseConverter";
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconLayoutSidebar,
  IconLetterCase,
} from "@tabler/icons-react";
import classes from "./app.module.css";
import { clsx } from "clsx";
import { BrowserOpenURL } from "../wailsjs/runtime/runtime";
import { theme } from "./theme";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const navItems = [
  {
    text: "YouTube Downloader",
    link: "/",
    icon: IconBrandYoutube,
  },
  {
    text: "Text Case Converter",
    link: "/text-case-converter",
    icon: IconLetterCase,
  },
];

export default function App() {
  const [activeWindowTitle, setActiveWindowTitle] = useState(navItems[0].text);
  const [opended, handlers] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      <HashRouter>
        <Box className={classes.wrapper}>
          <Box
            className={classes.sidebar}
            style={{
              display: opended ? "block" : "none",
            }}
          >
            <Box
              style={{
                "--wails-draggable": "drag",
              }}
              className={classes.sidebarHeader}
            ></Box>
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
                  onClick={() => setActiveWindowTitle(item.text)}
                >
                  <item.icon size={18} />
                  {item.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
          <Box className={classes.content}>
            <Box
              style={{
                "--wails-draggable": "drag",
                paddingLeft: opended ? "0.5rem" : "4.5rem",
              }}
              className={classes.contentHeader}
            >
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => handlers.toggle()}
              >
                <IconLayoutSidebar size={18} />
              </ActionIcon>
              <Text>{activeWindowTitle}</Text>
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
