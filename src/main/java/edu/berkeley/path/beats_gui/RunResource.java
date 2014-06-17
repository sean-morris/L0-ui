/**
 * Copyright (c) 2012, Regents of the University of California
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *   Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *   Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 **/

package edu.berkeley.path.beats_gui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.HttpHeaders;
/**
 * Restful Jersey based run execution For Via System
 *
 * @author smorris
 */

@Path("/run")
public class RunResource {

  @Context
  Request req;

  @Context
  HttpHeaders headers;

  /**
   *  Method to execute run
   *
   *  @return JSON representation Authentication User Resource (whether they logged in)
   */  
  @GET
  @Produces({ MediaType.APPLICATION_JSON })
  public String run() {
	  return this.JSONMessage(true, "Run Resource called", null);
  }
  
  public String JSONMessage(boolean success, String message, String resource) {

		// make sure to escape all quotes within message and resource strings
		if (message != null) {
			message = message.replace("\"", "\\\"");
		}

		// Construct JSON string of success, message and resource
		String returnJSON = "{\"success\":" + success + ", \"message\":" + "\"" + message + "\""
				+ ", \"resource\":" + resource + "}";

		// replace all newline characters for JSON since they prevent it from being parsed into an object
		returnJSON = returnJSON.replace("\n", "");

		return returnJSON;
	}
}
