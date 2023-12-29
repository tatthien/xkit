export namespace main {
	
	export class VideoFormat {
	    itag: number;
	    fps: number;
	    videoQuality: string;
	    audioQuality: string;
	    audioChannels: number;
	    language: string;
	    size: number;
	    bitrate: number;
	    mimeType: string;
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new VideoFormat(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.itag = source["itag"];
	        this.fps = source["fps"];
	        this.videoQuality = source["videoQuality"];
	        this.audioQuality = source["audioQuality"];
	        this.audioChannels = source["audioChannels"];
	        this.language = source["language"];
	        this.size = source["size"];
	        this.bitrate = source["bitrate"];
	        this.mimeType = source["mimeType"];
	        this.url = source["url"];
	    }
	}
	export class VideoInfo {
	    id: string;
	    title: string;
	    author: string;
	    duration: number;
	    description: string;
	    views: number;
	    thumbnail: string;
	    formats: VideoFormat[];
	
	    static createFrom(source: any = {}) {
	        return new VideoInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.author = source["author"];
	        this.duration = source["duration"];
	        this.description = source["description"];
	        this.views = source["views"];
	        this.thumbnail = source["thumbnail"];
	        this.formats = this.convertValues(source["formats"], VideoFormat);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

