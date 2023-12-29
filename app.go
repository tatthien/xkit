package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/kkdai/youtube/v2"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

type VideoFormat struct {
	Itag          int    `json:"itag"`
	FPS           int    `json:"fps"`
	VideoQuality  string `json:"videoQuality"`
	AudioQuality  string `json:"audioQuality"`
	AudioChannels int    `json:"audioChannels"`
	Language      string `json:"language"`
	Size          int64  `json:"size"`
	Bitrate       int    `json:"bitrate"`
	MimeType      string `json:"mimeType"`
	URL           string `json:"url"`
}

type VideoInfo struct {
	ID          string        `json:"id"`
	Title       string        `json:"title"`
	Author      string        `json:"author"`
	Duration    float64       `json:"duration"`
	Description string        `json:"description"`
	Views       int           `json:"views"`
	Thumbnail   string        `json:"thumbnail"`
	Formats     []VideoFormat `json:"formats"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetYouTubeInfo(id string) VideoInfo {
	client := youtube.Client{}
	video, err := client.GetVideo(id)
	if err != nil {
		log.Println(err)
		return VideoInfo{}
	}

	formats := video.Formats
	formats.Sort()

	videoInfo := VideoInfo{
		ID:          video.ID,
		Title:       video.Title,
		Author:      video.Author,
		Duration:    video.Duration.Seconds(),
		Description: video.Description,
		Views:       video.Views,
		Thumbnail:   video.Thumbnails[len(video.Thumbnails)-1].URL,
	}

	for _, format := range formats {
		bitrate := format.AverageBitrate
		if bitrate == 0 {
			bitrate = format.Bitrate
		}

		size := format.ContentLength
		if size == 0 {
			size = int64(float64(bitrate) * video.Duration.Seconds() / 8)
		}

		videoInfo.Formats = append(videoInfo.Formats, VideoFormat{
			Itag:          format.ItagNo,
			FPS:           format.FPS,
			VideoQuality:  format.QualityLabel,
			AudioQuality:  strings.ToLower(strings.TrimPrefix(format.AudioQuality, "AUDIO_QUALITY_")),
			AudioChannels: format.AudioChannels,
			Language:      format.LanguageDisplayName(),
			Size:          size,
			Bitrate:       bitrate,
			MimeType:      format.MimeType,
			URL:           format.URL,
		})
	}

	return videoInfo
}

func (a *App) DownloadYouTubeAsset(filename string, url string) {
	path, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		DefaultFilename: filename,
		Title:           "Save file",
	})

	if err != nil {
		log.Println(err)
		return
	}

	out, err := os.Create(filename)
	if err != nil {
		log.Println(err)
		return
	}
	defer out.Close()

	resp, err := http.Get(url)
	if err != nil {
		log.Println(err)
		return
	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println(path)
}
