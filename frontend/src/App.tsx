import "@mantine/core/styles.css";
import { Box, MantineProvider, Stack } from "@mantine/core";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Youtube from "./routes/Youtube";
import TextCaseConverter from "./routes/TextCaseConverter";
import { IconBrandYoutube, IconLetterCase } from "@tabler/icons-react";
import classes from "./app.module.css";
import { clsx } from "clsx";

const navItems = [
  {
    text: "Youtube download",
    link: "/youtube",
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
        <Box className={classes.mainContainer}>
          <Box className={classes.sidebar}>
            <Stack gap={2}>
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
            <Routes>
              <Route path="/youtube" element={<Youtube />} />
              <Route
                path="/text-case-converter"
                element={<TextCaseConverter />}
              />
            </Routes>
          </Box>
        </Box>
      </HashRouter>
    </MantineProvider>
  );
}
